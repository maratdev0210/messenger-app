import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessagesController.js";

const messagesRoutes = Router();

messagesRoutes.post("/getMessages", verifyToken, getMessages);

export default messagesRoutes;
