import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageRepository: Model<Image>,
  ) {}

  public async create(file: Express.Multer.File) {
    return await this.imageRepository.create({ path: file.filename });
  }

  public async findAll() {
    return await this.imageRepository.find({}).sort({ _id: 'desc' });
  }

  public async delete(path: string) {
    return await this.imageRepository.findOneAndDelete({path})
  }
}
