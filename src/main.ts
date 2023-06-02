import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './database/prisma.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutDownHooks(app) 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
    new ValidationPipe({
      transform: true,
      transformOptions: {
        groups:["transform"]
      }
    })
  )

  await app.listen(3000)
}
bootstrap()
