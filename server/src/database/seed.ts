import { UsersBl } from "../bl/users.bl";
import { UserTypeEnum } from "../enums/user.enums";
import UserModel from "../models/user.model";
import { BookRepository } from "../repositories/book.repository";
import bookList from "./seed/books.data";

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

  const bookRepository = new BookRepository();
  const countBooks = await bookRepository.count({});

  if (countBooks <= 0) {
    await bookRepository.createMany(bookList);
  }
};

export { Seed };
