import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt/dist'
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from './strategies/local.strategy' 
import { JwtStrategy } from './strategies/jwt.strategy'
import { ClientsModule } from '../clients/clients.module'

@Module({
  imports: [
    ClientsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: "1h"}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
