import { Document } from "mongoose";
import { IEntity } from "./IEntity";

export interface IUser extends IEntity {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  salt?:string;
  avatar?: string;
  gender?: string;
  type?: string;
}
