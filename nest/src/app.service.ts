import { HttpException, Injectable } from '@nestjs/common';

// NodeJs Imports
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

@Injectable()
export class AppService {
  getHello() {
    return 'api-nestjs is standing by';
  }
  async file(file: Express.Multer.File) {
    try {
      const filePath = resolve(__dirname, '../public/' + file.originalname);
      await writeFile(filePath, file.buffer);
      return { msg: '上传成功！' };
    } catch (err) {
      const msg = typeof err === 'string' ? err : err.message;
      throw new HttpException(msg, 500);
    }
  }
}
