import { MongoClient } from "mongodb";
import { connect } from "mongoose";

export class Database {
  private _mongoUrl;

  /**
   *
   */
  constructor() {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASSWORD } =
      process.env;

    const mongoAuth = MONGO_USER ? `${MONGO_USER}:${MONGO_PASSWORD}@` : "";
    this._mongoUrl = `mongodb://${mongoAuth}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
  }

  //connect mongoose
  public async mongooseConnect() {
    await connect(this._mongoUrl);
    console.log("mongoose is connected ...");
  }

  //Get Mongo db database
  public async getMongoDb() {
    let _mongoClient = new MongoClient(this._mongoUrl);

    let db: any = await _mongoClient.connect();

    db.close = () => {
      db.close();
    };

    return db;
  }
}
