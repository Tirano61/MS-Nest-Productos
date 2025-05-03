import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { envs } from './config/env';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Main');
  console.log(envs.natsServers);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options:{
        servers: envs.natsServers,
      }
    }
  
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen();
  logger.log(`Products Microservices running on port : ${ envs.port }`);
}
bootstrap();

