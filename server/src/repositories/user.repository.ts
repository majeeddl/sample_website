import { IUser } from "../interfaces/IUser";
import UserModel, { IUserModel } from "../models/user.model";

import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUserModel> {
  /**
   *
   */
  constructor() {
    super(UserModel);
  }

}
