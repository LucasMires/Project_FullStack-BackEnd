import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { User } from "../entities/user.entity"

export interface ILoginInfo {
    id: number
    email: string
    password: string
}

export abstract class UsersRepository {
    abstract create(createUserDto: CreateUserDto): Promise<User>
    abstract findAll(): Promise<User[]>
    abstract findOne(id: number): Promise<User>
    abstract findEmail(email: string): Promise<ILoginInfo>
    abstract update(id: number, updateUserDto: UpdateUserDto): Promise<User>
    abstract delete(id: number): Promise<void>
}


