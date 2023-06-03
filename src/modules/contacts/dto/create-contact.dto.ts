import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsString,
    IsOptional
} from "class-validator"

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsEmail()
    @IsOptional()
    email: string
    
    @IsNotEmpty()
    @IsNumberString()
    phone_number: string
}
