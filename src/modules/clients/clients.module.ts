import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ClientsController } from './clients.controller'
import { ClientsRepository } from './repositories/clients.repository'
import { ClientsPrismaRepository } from './repositories/prisma/clients.prisma.repository'
import { ClientsService } from './clients.service'

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    PrismaService,
    {
      provide: ClientsRepository,
      useClass: ClientsPrismaRepository
    }
  ],
  exports: [ClientsService]
})
export class ClientsModule {}
