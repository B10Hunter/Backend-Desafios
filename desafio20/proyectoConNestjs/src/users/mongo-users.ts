import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserModel } from "./schemas/user.schema";
import { UserRepository } from "./userRespository";
import { InjectModel } from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common"

@Injectable()
export class MongoUserRespository implements UserRepository {
    constructor(@InjectModel(User.name) private userModel:UserModel ){}

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userModel.create(user);
    }

    async getUser(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id: string): Promise<User> {
        return this.userModel.findOne({_id:id});
    }
}