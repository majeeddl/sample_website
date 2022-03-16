import { Model, Document } from "mongoose";
import { IEntity } from "../interfaces/IEntity";

export abstract class BaseRepository<T extends IEntity> {
  private _model: Model<IEntity>;

  constructor(model: Model<IEntity>) {
    this._model = model;
  }

  async count(query: any) {
    return await this._model.count(query);
  }

  async find(query: any) {
    return await this._model.find(query);
  }

  async findById(_id: string){
    return await this._model.findById(_id).exec();
  }

  async create(entity: T) {
    await this._model.create(entity);
  }
}
