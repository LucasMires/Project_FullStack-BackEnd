import { Client } from "src/modules/clients/entities/client.entity"
import { CreateContactDto } from "../dto/create-contact.dto"
import { UpdateContactDto } from "../dto/update-contact.dto"
import { Contact } from "../entities/contact.entity"

export abstract class ContactsRepository {
    abstract create(createContactDto: CreateContactDto, userId: string): Promise<Contact>
    abstract findAll(client_id: number): Promise<Contact[]>
    abstract findOne(id: string): Promise<Contact>
    abstract findByNumber(phone_number: string): Promise<Contact>
    abstract update(id: string, updateContactDto: UpdateContactDto): Promise<Contact>
    abstract delete(id: string): Promise<void>
}