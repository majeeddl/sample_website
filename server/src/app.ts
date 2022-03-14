
import { createServer } from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;


let server = createServer(app);


server.listen(port,()=>{
    console.log(` Server is starting at http://localhost:${port}/ `);
})

