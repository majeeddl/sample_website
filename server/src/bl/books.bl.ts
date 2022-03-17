import { IBook } from "../interfaces/IBook";
import { BookRepository } from "../repositories/book.repository";

export class BooksBl {
  private _bookRepository;

  /**
   *
   */
  constructor() {
    this._bookRepository = new BookRepository();
  }

  public async readById(id: string) {
    return await this._bookRepository.findById(id);
  }

  public async read(query: any = {}) {
    return await this._bookRepository.find(query);
  }

  public async create(book: IBook) {
    await this._bookRepository.create(book);
  }

  public async update(id: string, book: IBook) {
    return await this._bookRepository.update(id, book);
  }

  public async delete(id: string) {
    return await this._bookRepository.delete(id);
  }
}
