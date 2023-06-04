import { Exclude } from "class-transformer"

export class Client {
    readonly id: number
    readonly created_at: Date

    name: string
    email: string
    phone_number: string

    @Exclude()
    password: string
}
