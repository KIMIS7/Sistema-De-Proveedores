import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //Crea aplicacion de NetJS
  const app = await NestFactory.create(AppModule);
  
  //Permite que el Frontend haga peticiones en el Backend
  app.enableCors();

  app.setGlobalPrefix('api');
  //Inicia el servidor en puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();