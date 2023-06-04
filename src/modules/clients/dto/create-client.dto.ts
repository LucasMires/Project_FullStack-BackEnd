import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
    IsNumberString,
} from "class-validator"
import { Transform } from "class-transformer"
import { hashSync } from "bcryptjs"
import { ApiProperty } from "@nestjs/swagger"

export class CreateClientDto {
    @ApiProperty({
        default: "Lucas Mires",
        description: "User Name",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string

    @ApiProperty({
        default: "lucas@mail.com",
        description: "User Email",
        type: String
    })
    @IsEmail()
    email: string

    @ApiProperty({
        default: "55918263642",
        description: "User Phone Number",
        type: String
    })
    @IsNumberString()
    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    phone_number: string

    @ApiProperty({
        default: "12345678",
        description: "User Password",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }: { value: string }) => hashSync(value), {
        groups: ["transform"]
    })
    password: string
}
