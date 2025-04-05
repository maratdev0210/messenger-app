import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  getContactsForDMList,
  searchContacts,
} from "../controllers/ContactsController.js";

const contactRoutes = Router();
contactRoutes.post("/search", verifyToken, searchContacts);
contactRoutes.get("/getContactsForDm", verifyToken, getContactsForDMList);

export default contactRoutes;
