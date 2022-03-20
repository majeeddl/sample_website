import { Router } from "express";
import { sign } from "jsonwebtoken";
import { UsersBl } from "../bl/users.bl";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";
import { HashUtils } from "../utils/hash.utils";

const router: Router = Router();

const usersBl = new UsersBl();

router.post("/api/v1/auth/login", async (req: IRequest, res: IResponse) => {
  try {
    const { username, password } = req.body;

    const findUser = await usersBl.readOne({
      username: username,
    });

    if (!findUser) {
      return res.json({
        status: false,
        message: "user doesn't existed",
      });
    }


    const testHash = HashUtils.ComputeHash(password,findUser.salt!);

    if(findUser.password === testHash){
        const payload ={
            _id :findUser._id?.toString(),
            username: findUser.username,
            password : testHash
        }
        
        const token = sign(payload, process.env.TOKEN_SECRET as string, {
          expiresIn: "24h",
        });

        res.json({
            status : true,
            token : token,
            user : {
              username : findUser.username,
              name : findUser.name,
            }
        })
    }else{
        return res.json({
          status: false,
          message: "user or password is not correct",
        });
    }

  } catch (e) {
      console.log(e);

      return res.json({
        status: false,
        message: "user or password is not correct",
      });
  }
});

export const AuthRouter = router;
