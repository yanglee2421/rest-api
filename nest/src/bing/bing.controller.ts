// NestJs Imports
import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { BingService } from './bing.service';

// DTO Imports
import { Rquery } from './dto';

@Controller('bing')
export class BingController {
  constructor(private readonly BingService: BingService) {}

  @Get()
  async find(@Query() query: Rquery) {
    const { idx, n } = query;

    try {
      return await this.BingService.find(idx, n);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
