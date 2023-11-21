import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('api/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.create(file);
  }

  @UseGuards(AuthGuard)
  @Get()
  getImagesPath() {
    return this.imagesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getImagePath(@Param('id') id: string) {
    return this.imagesService.findById(id);
  }
}
