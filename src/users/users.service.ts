import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userRepository: Model<User>,
  ) {}

  async findOne(username: string) {
    return this.userRepository.findOne({ username });
  }
}
