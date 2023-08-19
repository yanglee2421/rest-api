// NestJs Imports
import { Injectable } from '@nestjs/common';

// NodeJs Imports
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

@Injectable()
export class FileService {
  async file(file: Express.Multer.File) {
    const filePath = resolve(__dirname, '../public/' + file.originalname);
    await writeFile(filePath, file.buffer);
    return { msg: '上传成功！' };
  }
}
