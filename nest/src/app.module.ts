// NestJs Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// App Imports
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Modules Imports
import { CoffeeModule } from './coffee/coffee.module';
import { BingModule } from './bing/bing.module';
import { TableModule } from './table/table.module';

// NodeJs Imports
import { resolve } from 'node:path';
import { FileModule } from './file/file.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

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
    BingModule,
    TableModule,
    FileModule,
    EventsModule,
  ],
  providers: [AppService, EventsGateway],
  controllers: [AppController],
})
export class AppModule {}
