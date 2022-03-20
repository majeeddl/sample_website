

import { Router } from "express";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";
import { jwtMiddleware } from "../middlewares/jwt.middleware";

const router: Router = Router();

router.get("/api/v1/account", async (req: IRequest, res: IResponse) => {

    res.json({
        status : true,
        user : {
            username : req.user?.username,
            name : req.user?.name
        }
    })

});

export const AccountRouter = router;
