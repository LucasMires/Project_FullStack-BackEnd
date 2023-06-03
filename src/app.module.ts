import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './database/prisma.service'
import { AuthModule } from './modules/auth/auth.module'
import { ContactsModule } from './modules/contacts/contacts.module'
import { ClientsModule } from './modules/clients/clients.module'

@Module({
  imports: [ClientsModule, AuthModule, ContactsModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
