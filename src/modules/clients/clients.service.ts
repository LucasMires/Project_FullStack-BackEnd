import { Injectable } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'
import { NotFoundException, ConflictException } from '@nestjs/common/exceptions'

@Injectable()
export class ClientsService {
	constructor(private clientsRepository: ClientsRepository) {}
	async create(createClientDto: CreateClientDto) {
		return await this.clientsRepository.create(createClientDto)
	}

	async findAll() {
		return await this.clientsRepository.findAll()
	}

	async findOne(id: string) {
		return await this.clientsRepository.findOne(parseInt(id))
	}

	async update(id: string, UpdateClientDto: UpdateClientDto) {
		return await this.clientsRepository.update(parseInt(id), UpdateClientDto)
	}

	async remove(id: string) {
		return await this.clientsRepository.delete(parseInt(id))
	}

	async findByEmail(email: string) {
		const client = await this.clientsRepository.findEmail(email)
		return client
	}
}
