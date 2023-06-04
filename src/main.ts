import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './database/prisma.service'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
  .setTitle("SV Contacts")
  .setDescription("Simple way to save and view your contacts")
  .setVersion("0.5.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

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
