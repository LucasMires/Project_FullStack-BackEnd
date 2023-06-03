import { Injectable } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'
import { NotFoundException, ConflictException } from '@nestjs/common/exceptions'

@Injectable()
export class ClientsService {
	constructor(private clientsRepository: ClientsRepository) {}
	async create(createClientDto: CreateClientDto) {
		const client = await this.clientsRepository.findEmail(createClientDto.email)
		if (client) {
			throw new ConflictException("Email already in use")
		}
		const clientNumber = await this.clientsRepository.findByNumber(createClientDto.phone_number)
		if (clientNumber) {
			throw new ConflictException("Phone number already in use")
		}
		
		return await this.clientsRepository.create(createClientDto)
	}

	async findAll() {
		return await this.clientsRepository.findAll()
	}

	async findOne(id: string) {
		const client = await this.clientsRepository.findOne(parseInt(id))
		if (!client) {
			throw new NotFoundException("Client not exists")
		}
		return await this.clientsRepository.findOne(parseInt(id))
	}

	async update(id: string, UpdateClientDto: UpdateClientDto) {
		const client = await this.clientsRepository.findOne(parseInt(id))
		if (!client) {
			throw new NotFoundException("Client not exists")
		}
		return await this.clientsRepository.update(parseInt(id), UpdateClientDto)
	}

	async remove(id: string) {
		const client = await this.clientsRepository.findOne(parseInt(id))
		if (!client) {
			throw new NotFoundException("Client not exists")
		}
		return await this.clientsRepository.delete(parseInt(id))
	}

	async findByEmail(email: string) {
		const client = await this.clientsRepository.findEmail(email)
		return client
	}
}
