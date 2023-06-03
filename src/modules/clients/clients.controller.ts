import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { HttpCode } from '@nestjs/common/decorators'
import { UseGuards } from "@nestjs/common/decorators"
import { JwtAuthGuard } from '../auth/authJwt/jwt-auth.guard' 
import { ClientsService } from './clients.service'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.clientsService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id)
  }
}
