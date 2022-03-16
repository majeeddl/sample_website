import { Document, Model, Schema, model } from "mongoose";
import * as mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

// export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends IUser {

}

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const UserModel:Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default UserModel;
