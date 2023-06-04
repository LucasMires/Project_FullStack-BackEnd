import {
    Injectable,
    NestMiddleware,
    NotFoundException
} from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { ClientsRepository } from "src/modules/clients/repositories/clients.repository"

@Injectable()
export class EnsureClientExistsMiddleware implements NestMiddleware {
    constructor(private clientsRepository: ClientsRepository) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.params.id) {
            const client = await this.clientsRepository.findOne(parseInt(req.params.id))
            if (!client) {
                throw new NotFoundException("Client not exists")
            }
        }
        next()
    }
}
