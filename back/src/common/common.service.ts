import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class CommonService {
  generateRandomString(length: number): string {
    return randomstring.generate({
      length,
      charset: 'alphanumeric',
    });
  }
}
