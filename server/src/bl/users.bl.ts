import { UserTypeEnum } from "../enums/user.enums";
import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../repositories/user.repository";
import { HashUtils } from "../utils/hash.utils";


export class UsersBl{
    private _userRepository;

    constructor(){
        this._userRepository = new UserRepository()
    }

    public async find(query:any={}){

    }

    public async readOne(query:any){
        return await this._userRepository.findOne(query);
    }

    public async create(user:IUser){

        const salt = HashUtils.CreateSalt();
        const password = HashUtils.ComputeHash(user.password!, salt);

        user.password = password;
        user.salt = salt;

        if(!user.type){
            user.type = UserTypeEnum.User
        }

        await this._userRepository.create(user);
    }
}