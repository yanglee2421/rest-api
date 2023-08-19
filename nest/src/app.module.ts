import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// NodeJs Imports
import { resolve } from 'node:path';

// App Imports
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Modules Imports
import { CoffeeModule } from './coffee/coffee.module';
import { QqlykmModule } from './qqlykm/qqlykm.module';
import { PasModule } from './pas/pas.module';
import { BingModule } from './bing/bing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: resolve(__dirname, '../db.sqlite3'),
      synchronize: true,
      // Only NestJs
      autoLoadEntities: true,
    }),
    CoffeeModule,
    QqlykmModule,
    PasModule,
    BingModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
