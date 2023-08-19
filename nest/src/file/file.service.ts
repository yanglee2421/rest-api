// NestJs Imports
import { Injectable } from '@nestjs/common';

// NodeJs Imports
import { resolve } from 'node:path';
import { appendFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {
    const filePath = resolve(process.cwd(), './public/' + file.originalname);
    await appendFile(filePath, file.buffer);
    return { msg: '上传成功！' };
  }
  async base64(file: Express.Multer.File) {
    return file.buffer.toString('base64');
  }
}
