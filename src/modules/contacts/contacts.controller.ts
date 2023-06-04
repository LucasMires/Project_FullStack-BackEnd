import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { HttpCode, UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist'


@ApiTags("Contacts")
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post('')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    create(@Body() createContactDto: CreateContactDto, @Request() req) {
        return this.contactsService.create(createContactDto, req.user.id)
    }

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    findAll(@Request() req) {
        return this.contactsService.findAll(req.user.id)
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string, @Request() req) {
        return this.contactsService.findOne(id, req.user.id)
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto, @Request() req) {
        return this.contactsService.update(id, updateContactDto, req.user.id)
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string, @Request() req) {
        return this.contactsService.remove(id, req.user.id)
    }
}
