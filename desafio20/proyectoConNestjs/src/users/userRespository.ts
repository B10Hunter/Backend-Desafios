import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

export const USERS_REPOSITORY = 'UserRepository';

export interface UserRepository {
    createUser( user: CreateUserDto ) : Promise<User>
    getUser(): Promise<User[]>
    getUserById(id: string) : Promise<User>


}