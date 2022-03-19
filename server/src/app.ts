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
import { verify } from "jsonwebtoken";
import { IRequest } from "./interfaces/IRequest";
import { IResponse } from "./interfaces/IResponse";
import { UserRepository } from "./repositories/user.repository";
import { IUser } from "./interfaces/IUser";
import { AuthRouter } from "./routes/auth.routes";
import { BookRouter } from "./routes/book.routes";
import { UserRouter } from "./routes/user.routes";
import { FileRouter } from "./routes/file.routes";
import { jwtMiddleware } from "./middlewares/jwt.middleware";

const app: express.Application = express();

//Configure environment from env file
config();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const database = new Database();

database.mongooseConnect().then(async () => {
  await Seed();
});

app.use(AuthRouter);
app.use(BookRouter);
app.use(UserRouter);
app.use(FileRouter);


app.use(jwtMiddleware)
//jwt verification
// app.use(async (req: IRequest, res: IResponse, next: any) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (token == null) return res.sendStatus(401);

//     const decoded: any = await verify(token, process.env.TOKEN_SECRET!);

//     const userRepository = new UserRepository();

//     const findUser: IUser = await userRepository.findById(decoded._id);

//     if (decoded.password) {
//       if (findUser.password == decoded.password) {
//         req.user = findUser;
//         return next();
//       }
//     }

//     return res.status(403).send({
//       success: false,
//       message: "Failed to authenticate token.",
//     });
//   } catch (err) {
//     console.log(err);

//     return res.status(403).send({
//       success: false,
//       message: "Failed to authenticate token.",
//     });
//   }
// });



const port = process.env.PORT;

let server = createServer(app);

server.listen(port, () => {
  console.log(
    ` Server is starting at \n http://localhost:${port}/ \n http://${ip.address()}:${port}/`
  );
});
