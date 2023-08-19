// NestJs Imports
import { Injectable } from '@nestjs/common';

// API Imports
import { bing_get } from '@/api';

@Injectable()
export class BingService {
  find(idx = 0, n = 8) {
    return bing_get({
      params: {
        format: 'js',
        idx,
        n,
      },
    });
  }
}
