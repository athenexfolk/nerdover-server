import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink } from 'fs';
import { join } from 'path';

@Controller('api/images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file);
  }

  @Get()
  getImagePaths() {
    return this.imageService.findAll();
  }

  @Delete('delete/:path')
  deleteImage(@Param('path') path: string) {
    unlink(join(__dirname, '../../public/upload', path), (err) => {
      console.log('Delete successful');
    });
    return this.imageService.delete(path);
  }
}
