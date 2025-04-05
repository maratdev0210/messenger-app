import { Types } from "mongoose";

export interface Message {
  _id?: Types.ObjectId;
  sender: Types.ObjectId | string;
  recipient?: Types.ObjectId | string;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string | undefined;
  timestamp?: Date;
}
