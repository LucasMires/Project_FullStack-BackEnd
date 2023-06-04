import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'

@ApiTags("Login")
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: LoginDto) {
    return this.authService.login(client.email)
  }
}
