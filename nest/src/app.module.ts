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
import { FileModule } from './file/file.module';
import { EventsModule } from './events/events.module';

// NodeJs Imports
import { resolve } from 'node:path';

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
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
