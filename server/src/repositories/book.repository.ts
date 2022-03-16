import BookModel, { IBookModel } from "../models/book.model";
import { BaseRepository } from "./base.repository";



export class BookRepository extends BaseRepository<IBookModel>{

    /**
     *
     */
    constructor() {
        super(BookModel);
        
    }
}