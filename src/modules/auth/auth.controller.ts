import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './authLocal/local-auth.guard'
import { UseGuards } from '@nestjs/common/decorators'
import { ILoginInfo } from '../clients/repositories/clients.repository'

type IClientLogin = Omit<ILoginInfo, "id" | "password">

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: IClientLogin) {
    return this.authService.login(client.email)
  }
}
