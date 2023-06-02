import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async userValidade(userEmail: string, userPassword: string) {
		const user = await this.usersService.findByEmail(userEmail)

		if (user) {
			const passwordMatch = await compare(userPassword, user.password)
			if (passwordMatch) {
				return { email: user.email }
			}
		}
		return null
	}

	async login(email: string) {
		const user = await this.usersService.findByEmail(email)
		return {
			token: this.jwtService.sign({email}, {subject: user.id.toString()})
		}
	}
}
