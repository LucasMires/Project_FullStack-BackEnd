import { PrismaService } from "src/database/prisma.service"
import { CreateClientDto } from "../../dto/create-client.dto"
import { Client } from "../../entities/client.entity"
import { UpdateClientDto } from "../../dto/update-client.dto"
import { Injectable } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { ClientsRepository, ILoginInfo } from "../clients.repository"

@Injectable()
export class ClientsPrismaRepository implements ClientsRepository {
    constructor(private prisma: PrismaService) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const client = new Client()
        Object.assign(client, {
            ...createClientDto
        })

        const newClient = await this.prisma.client.create({
            data: {
                ...createClientDto  
            }
        })
        return plainToInstance(Client, newClient)
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.prisma.client.findMany()
        return plainToInstance(Client, clients)
    }

    async findOne(id: number): Promise<Client> {
        const client = await this.prisma.client.findUnique({
            where: { id }
        })
        return plainToInstance(Client, client)
    }

    async findEmail (clientEmail: string): Promise<ILoginInfo> {
        const client = await this.prisma.client.findUnique({
            where: { email: clientEmail }
        })
        if (client) {
            const { id, email, password } = client
            return { id, email, password }
        }
        return client
    }

    async findByNumber(phone_number: string): Promise<Client> {
        const client =  await this.prisma.client.findUnique({
            where: { phone_number }
        })
        return client
    }

    async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        const updatedClient = await this.prisma.client.update({
            where: { id },
            data: { ...updateClientDto }
        })
        return plainToInstance(Client, updatedClient)
    }

    async delete(id: number): Promise<void> {
        await this.prisma.client.delete({
            where: { id }
        })
    }
}
