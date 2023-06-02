import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './repositories/users.repository'
import { NotFoundException, ConflictException } from '@nestjs/common/exceptions'

@Injectable()
export class UsersService {
	constructor(private usersRepository: UsersRepository) {}
	async create(createUserDto: CreateUserDto) {
		const user = await this.usersRepository.findEmail(createUserDto.email)
		if (user) {
			throw new ConflictException("Email already in use")
		}
		return await this.usersRepository.create(createUserDto)
	}

	async findAll() {
		return await this.usersRepository.findAll()
	}

	async findOne(id: string) {
		const user = await this.usersRepository.findOne(parseInt(id))
		if (!user) {
			throw new NotFoundException("User not exists")
		}
		return await this.usersRepository.findOne(parseInt(id))
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOne(parseInt(id))
		if (!user) {
			throw new NotFoundException("User not exists")
		}
		return await this.usersRepository.update(parseInt(id), updateUserDto)
	}

	async remove(id: string) {
		const user = await this.usersRepository.findOne(parseInt(id))
		if (!user) {
			throw new NotFoundException("User not exists")
		}
		return await this.usersRepository.delete(parseInt(id))
	}

	async findByEmail(email: string) {
		const user = await this.usersRepository.findEmail(email)
		return user
	}
}
