import { ApiProperty } from "@nestjs/swagger"
import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsString,
    IsOptional
} from "class-validator"

export class CreateContactDto {
    @ApiProperty({
        default: "Lucas Jordan",
        description: "Contact Name",
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        default: "jordan@mail.com",
        description: "Contact Email",
        type: String
    })
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty({
        default: "55918263642",
        description: "Contact Phone Number",
        type: String
    })
    @IsNotEmpty()
    @IsNumberString()
    phone_number: string
}
