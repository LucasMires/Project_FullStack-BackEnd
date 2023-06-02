import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ILoginInfo } from '../users/repositories/users.repository'
import { LocalAuthGuard } from './authLocal/local-auth.guard'
import { UseGuards } from '@nestjs/common/decorators'

type IUserLogin = Omit<ILoginInfo, "id" | "password">

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("")
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: IUserLogin) {
    return this.authService.login(user.email)
  }
}
