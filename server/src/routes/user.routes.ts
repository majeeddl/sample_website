import { Router } from "express";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";

const router: Router = Router();

router.get("/api/v1/users", async (req: IRequest, res: IResponse) => {});

export const UserRouter = router;
