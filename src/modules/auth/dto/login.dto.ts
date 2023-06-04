import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
    @ApiProperty({
        default: "lucas@mail.com",
        description: "User Email",
        type: String
    })
    @IsEmail()
    email: string

    @ApiProperty({
        default: "********",
        description: "User Password",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
