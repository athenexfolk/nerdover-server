import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    
    return this.imagesService.create(file);
  }

  @Get()
  getImagesPath() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  getImagePath(@Param('id') id: string) {
    return this.imagesService.findById(id);
  }
}
