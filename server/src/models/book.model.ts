import { Document, Model, Schema, model } from "mongoose";
import { IBook } from "../interfaces/IBook";

export interface IBookModel extends IBook {}

const BookSchema = new Schema<IBookModel>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    collection: "books",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const BookModel: Model<IBookModel> = model<IBookModel>("Book", BookSchema);

export default BookModel;
