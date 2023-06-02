import { Exclude } from "class-transformer"

export class User {
    readonly id: number
    
    readonly created_at: string
    name: string
    email: string
    phone_number: number
    @Exclude()
    password: string
}
