import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Types Imports
import type { Response as resType } from 'express';

// NodeJs Imports
import { resolve } from 'node:path';

// Service Imports
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /* @Get()
  getHello(@Response() res: resType) {
    return res.sendFile(resolve(__dirname, '../../view/index.html'));
  } */

  @Get('/vite-react/*')
  webReact(@Response() res: resType) {
    const filePath = resolve(__dirname, '../view/react-app/index.html');
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  file(@UploadedFile() file: Express.Multer.File) {
    return this.appService.file(file);
  }
}
