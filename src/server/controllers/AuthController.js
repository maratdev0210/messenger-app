import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlink, unlinkSync } from "fs";

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
      image: userData.image,
      profileColor: userData.profileColor,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (request, response, next) => {
  try {
    const { userId } = request;
    const { profileColor } = request.body;

    if (!profileColor) {
      return response.status(404).send("Color is required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        profileColor,
      },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      id: userData.id,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      profileColor: userData.profileColor,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const addProfileImage = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      id: updatedUser.id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      image: updatedUser.image,
      profileColor: updatedUser.profileColor,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const removeProfileImage = async (request, response, next) => {
  try {
    const { userId } = request;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).send("User not found!");
    }
    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return response.status(200).send("Image deleted successfully!");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const logout = async (request, response, next) => {
  try {
    response.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    return response.status(200).send("Log out Successfully!");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};
