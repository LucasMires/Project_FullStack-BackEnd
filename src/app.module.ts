import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './database/prisma.service'
import { AuthModule } from './modules/auth/auth.module'
import { ContactsModule } from './modules/contacts/contacts.module'
import { ClientsModule } from './modules/clients/clients.module'
import { EnsureClientExistsMiddleware } from './middlewares/ensure-client-exists.middleware'
import { ClientsService } from './modules/clients/clients.service'
import { ClientsRepository } from './modules/clients/repositories/clients.repository'
import { ClientsPrismaRepository } from './modules/clients/repositories/prisma/clients.prisma.repository'
import { ValidadeClientInfoMiddleware } from './middlewares/validade-client-info.middleware'

@Module({
	imports: [ClientsModule, AuthModule, ContactsModule],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		ClientsService,
		{
			provide: ClientsRepository,
			useClass: ClientsPrismaRepository
		}
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ValidadeClientInfoMiddleware)
		.forRoutes(
			{path: "clients/", method: RequestMethod.POST},
			{path: "clients/", method: RequestMethod.PATCH},
		);

		consumer.apply(EnsureClientExistsMiddleware)
		.forRoutes(
			{path: "clients/:id", method: RequestMethod.GET},
			{path: "clients/:id", method: RequestMethod.PATCH},
			{path: "clients/:id", method: RequestMethod.DELETE}
		);
	}
}
