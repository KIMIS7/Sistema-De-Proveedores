import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from './providers/providers.module';
import { ServicesModule } from './services/services.module';
import { RatesModule } from './rates/rates.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'salvador',
    password: '',
    database: 'horizon_db',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: true,

  }), ProvidersModule, ServicesModule, RatesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
