import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (username, userId) => {
  return jwt.sign({ username, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const { username, password, firstName, lastName } = request.body;

    if (!username || !password) {
      return response.status(400).send("Username and Password is required");
    }
    const user = await User.create({ username, password, firstName, lastName });
    response.cookie("jwt", createToken(username, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const login = async (request, response, next) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).send("Username and Password is required");
    }
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).send("Username does not exist.");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Password is incorrect");
    }

    response.cookie("jwt", createToken(username, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
      httpOnly: true,
    });
    return response.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
    const userData = await User.findById(request.userId);
    if (!userData) {
      return response.status(404).send("User with the given id not found!");
    }
    return response.status(200).json({
      id: userData.id,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};
