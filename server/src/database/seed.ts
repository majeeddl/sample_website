import { UsersBl } from "../bl/users.bl";
import { UserTypeEnum } from "../enums/user.enums";
import UserModel from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

const Seed = async () => {
  const findAdminUser = await UserModel.findOne({
    username: "admin",
    type: UserTypeEnum.Admin,
  }).exec();

  const userBl = new UsersBl();
  if (!findAdminUser) {
    await userBl.create({
      username: "admin",
      password: "admin",
      type: UserTypeEnum.Admin,
    });

    console.log(" Create admin user");
  }
};

export { Seed };
