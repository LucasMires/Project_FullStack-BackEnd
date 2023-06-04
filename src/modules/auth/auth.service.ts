import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ClientsService } from '../clients/clients.service'

@Injectable()
export class AuthService {
	constructor(
		private clientsService: ClientsService,
		private jwtService: JwtService
	) {}

	async userValidade(userEmail: string, userPassword: string) {
		const user = await this.clientsService.findByEmail(userEmail)

		if (user) {
			const passwordMatch = await compare(userPassword, user.password)
			if (passwordMatch) {
				return { email: user.email }
			}
		}
		return null
	}

	async login(email: string) {
		const user = await this.clientsService.findByEmail(email)
		return {
			token: this.jwtService.sign({email}, {subject: user.id.toString()})
		}
	}
}
