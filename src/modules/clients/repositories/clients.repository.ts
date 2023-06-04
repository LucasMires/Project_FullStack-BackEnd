import { Client } from "../entities/client.entity" 
import { CreateClientDto } from "../dto/create-client.dto"
import { UpdateClientDto } from "../dto/update-client.dto"


export interface ILoginInfo {
    id: number
    email: string
    password: string
}

export abstract class ClientsRepository {
    abstract create(createClientDto: CreateClientDto): Promise<Client>
    abstract findAll(): Promise<Client[]>
    abstract findEmail(email: string): Promise<ILoginInfo>
    abstract findByNumber(phone_number: string): Promise<Client>
    abstract findOne(id: number): Promise<Client>
    abstract update(id: number, updateClientDto: UpdateClientDto): Promise<Client>
    abstract delete(id: number): Promise<void>
}
