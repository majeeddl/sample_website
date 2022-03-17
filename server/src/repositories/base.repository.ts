import { Model, Document } from "mongoose";
import { IEntity } from "../interfaces/IEntity";

export abstract class BaseRepository<T extends IEntity> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async count(query: any) {
    return await this._model.count(query);
  }

  async find(query: any) {
    return await this._model.find(query).exec();
  }

  async findOne(query: any) {
    return await this._model.findOne(query).exec();
  }

  async findById(_id: string): Promise<any> {
    return await this._model.findById(_id).exec();
  }

  async create(entity: T) {
    await this._model.create(entity);
  }

  async createMany(entityList: Array<T>) {
    await this._model.insertMany(entityList);
  }

  async update(id: string, entity: T) {
    delete entity._id;
    return await this._model.findByIdAndUpdate(
      id,
      {
        $set: entity,
      },
      { new: true }
    );
  }

  async delete(id:string) {
    await this._model.findByIdAndDelete(id);
  }
}
