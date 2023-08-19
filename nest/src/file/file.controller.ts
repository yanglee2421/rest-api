// NestJs Imports
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Service Imports
import { FileService } from './file.service';

// Types Imports
import type { Response as Res } from 'express';

// NodeJs Imports
import { resolve } from 'node:path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/html/*')
  html(@Response() res: Res) {
    const filePath = resolve(process.cwd(), './public/index.html');
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async file(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.fileService.file(file);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
