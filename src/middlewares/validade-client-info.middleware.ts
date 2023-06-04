import {
    ConflictException,
    Injectable,
    NestMiddleware,
    NotFoundException
} from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { ClientsRepository } from "src/modules/clients/repositories/clients.repository"

@Injectable()
export class ValidadeClientInfoMiddleware implements NestMiddleware {
    constructor(private clientsRepository: ClientsRepository) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.body.email) {
            const client = await this.clientsRepository.findEmail((req.body.email))
            if (client) {
                throw new ConflictException("Email already in use")
            }
        }

        if (req.body.phone_number) {
            const clientNumber = await this.clientsRepository.findByNumber(req.body.phone_number)
            if (clientNumber) {
                throw new ConflictException("Phone number already in use")
            }
        }
       next()
    }
}
