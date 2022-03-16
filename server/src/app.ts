import { createServer } from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
var ip = require("ip");
import { config } from "dotenv";

import { Seed } from "./database/seed";
import { Database } from "./database/database";

const app: express.Application = express();

//Configure environment from env file
config();

// const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASSWORD } =
//   process.env;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const mongoAuth = MONGO_USER ? `${MONGO_USER}:${MONGO_PASSWORD}@` : "";

// connect(`mongodb://${mongoAuth}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`).then(async () => {
//   console.log("mongo db is connected ...");

//   await Seed();
// });
const database = new Database();
database.mongooseConnect().then(async () => {
  await Seed();
});

const port = process.env.PORT;

let server = createServer(app);

server.listen(port, () => {
  console.log(
    ` Server is starting at \n http://localhost:${port}/ \n http://${ip.address()}:${port}/`
  );
});
