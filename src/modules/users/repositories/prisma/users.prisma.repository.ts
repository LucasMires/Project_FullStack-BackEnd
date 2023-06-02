import { PrismaService } from "src/database/prisma.service"
import { UsersRepository } from "../users.repository"
import { CreateUserDto } from "../../dto/create-user.dto"
import { User } from "../../entities/user.entity"
import { UpdateUserDto } from "../../dto/update-user.dto"
import { Injectable } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { ILoginInfo } from "../users.repository"

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()
        Object.assign(user, {
            ...createUserDto
        })

        const newUser = await this.prisma.client.create({
            data: {
                ...createUserDto  
            }
        })
        return plainToInstance(User, newUser)
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.client.findMany()
        return plainToInstance(User, users)
    }

    async findOne(id: number): Promise<User> {
        const user = await this.prisma.client.findUnique({
            where: { id }
        })
        return plainToInstance(User, user)
    }

    async findEmail (userEmail: string): Promise<ILoginInfo> {
        const user = await this.prisma.client.findUnique({
            where: { email: userEmail }
        })
        
        const { id, email, password } = user
        return { id, email, password }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.prisma.client.update({
            where: { id },
            data: { ...updateUserDto }
        })
        return plainToInstance(User, updatedUser)
    }

    async delete(id: number): Promise<void> {
        await this.prisma.client.delete({
            where: { id }
        })
    }

}