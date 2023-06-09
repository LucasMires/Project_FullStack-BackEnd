import { Injectable } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'
import { UnauthorizedException } from '@nestjs/common/exceptions'

@Injectable()
export class ClientsService {
	constructor(private clientsRepository: ClientsRepository) {}
	async create(createClientDto: CreateClientDto) {
		return await this.clientsRepository.create(createClientDto)
	}

	async findAll() {
		return await this.clientsRepository.findAll()
	}

	async findOne(id: string, userId: string) {
		if (id !== userId) throw new UnauthorizedException("Action not allowed")
		return await this.clientsRepository.findOne(parseInt(id))
	}

	async findUser(userId: string) {
		return await this.clientsRepository.findOne(parseInt(userId))
	}

	async update(id: string, UpdateClientDto: UpdateClientDto, userId: string) {
		if (id !== userId) throw new UnauthorizedException("Action not allowed")
		return await this.clientsRepository.update(parseInt(id), UpdateClientDto)
	}

	async remove(id: string, userId: string) {
		if (id !== userId) throw new UnauthorizedException("Action not allowed")
		return await this.clientsRepository.delete(parseInt(id))
	}

	async findByEmail(email: string) {
		const client = await this.clientsRepository.findEmail(email)
		return client
	}
}
