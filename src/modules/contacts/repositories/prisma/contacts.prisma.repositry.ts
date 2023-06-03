import { PrismaService } from "src/database/prisma.service"
import { CreateContactDto } from "../../dto/create-contact.dto"
import { UpdateContactDto } from "../../dto/update-contact.dto"
import { Contact } from "../../entities/contact.entity"
import { ContactsRepository } from "../contacts.repository"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
    constructor(private prisma: PrismaService) {}

    async create(createContactDto: CreateContactDto, client_id: string): Promise<Contact> {
        const contact = new Contact()
        Object.assign(contact,{
            ...createContactDto
        })

        const newContact = await this.prisma.contact.create({
            data: {
                ...contact,
                client_id: parseInt(client_id)
            }
        })

        return newContact
    }

    async findAll(client_id: number): Promise<Contact[]> {
        return await this.prisma.contact.findMany({
            where: { client_id: parseInt(client_id.toString()) }
        })
    }

    async findOne(id: string): Promise<Contact> {
        return await this.prisma.contact.findUnique({
            where: { id: parseInt(id) }
        })
    }

    async findByNumber(phone_number: string): Promise<Contact> {
        return await this.prisma.contact.findUnique({
            where: { phone_number }
        })
    }

    async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
        const updatedContact = await this.prisma.contact.update({
            where: { id: parseInt(id) },
            data: {
                ...updateContactDto
            }
        })
        return updatedContact
    }

    async delete(id: string): Promise<void> {
        await this.prisma.contact.delete({
            where: { id: parseInt(id) }
        })
    }
}
