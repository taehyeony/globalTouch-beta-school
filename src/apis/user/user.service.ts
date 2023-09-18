import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  hello(): string {
    return 'hello2';
  }
}
