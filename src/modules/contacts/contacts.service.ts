import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { ContactsRepository } from './repositories/contacts.repository'

@Injectable()
export class ContactsService {
    constructor(private contactsRepository: ContactsRepository) {}

    async create(createContactDto: CreateContactDto, userId: string) {
        const contact = await this.contactsRepository.findByNumber(createContactDto.phone_number)
        if (contact) {
            throw new ConflictException("Number already in use")
        }
        return this.contactsRepository.create(createContactDto, userId)
    }

    async findAll(client_id: number) {
        return await this.contactsRepository.findAll(client_id)
    }

    async validateUserAndClientId(id: string, client_id:string) {
        const contact = await this.contactsRepository.findOne(id)
        if (contact) {
            if (contact.client_id !== parseInt(client_id)) {
                throw new UnauthorizedException("This contact doesn't belong to your account")
            }
            return contact
        }else if (!contact){
            throw new NotFoundException("Contact not found")
        }
        return contact
    }

    async findOne(id: string, client_id: string) {
        return await this.validateUserAndClientId(id, client_id)
    }

    async update(id: string, updateContactDto: UpdateContactDto, client_id: string) {
        await this.validateUserAndClientId(id, client_id)
        return await this.contactsRepository.update(id, updateContactDto)
    }

    async remove(id: string, client_id: string) {
        await this.validateUserAndClientId(id, client_id)
        return await this.contactsRepository.delete(id)
    }
}
