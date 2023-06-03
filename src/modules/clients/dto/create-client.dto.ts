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

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string

    @IsEmail()
    email: string

    @IsNumberString()
    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    phone_number: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }: { value: string }) => hashSync(value), {
        groups: ["transform"]
    })
    password: string
}
