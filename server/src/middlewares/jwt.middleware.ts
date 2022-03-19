import { verify } from "jsonwebtoken";
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../repositories/user.repository";




const jwtMiddleware = async (req: IRequest, res: IResponse, next: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const decoded: any = await verify(token, process.env.TOKEN_SECRET!);

    const userRepository = new UserRepository();

    const findUser: IUser = await userRepository.findById(decoded._id);

    if (decoded.password) {
      if (findUser.password == decoded.password) {
        req.user = findUser;
        return next();
      }
    }

    return res.status(403).send({
      success: false,
      message: "Failed to authenticate token.",
    });
  } catch (err) {
    console.log(err);

    return res.status(403).send({
      success: false,
      message: "Failed to authenticate token.",
    });
  }
}


export {jwtMiddleware}