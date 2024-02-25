import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly imageService: ImageService,
  ) {}

  @Get('categories')
  getCategories() {
    return this.lessonService.findAllCategories();
  }

  @Get('categories/:categoryId')
  getCategoryById(@Param('categoryId') categoryId: string) {
    return this.lessonService.findCategoryById(categoryId);
  }

  @Get('categories/:categoryId/lessons')
  getLessonsByCategoryId(@Param('categoryId') categoryId: string) {
    return this.lessonService.findAllLessonsByCategoryId(categoryId);
  }

  @Get('lessons')
  getLessons() {
    return this.lessonService.findAllLessons();
  }

  @Get('lessons/:categoryId/:lessonId')
  getLessonById(
    @Param('categoryId') categoryId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonService.findLessonById(categoryId, lessonId);
  }

  @Post('categories')
  @UseInterceptors(FileInterceptor('cover'))
  async createCategory(
    @UploadedFile() cover: Express.Multer.File,
    @Body() { key, label }: CreateCategoryDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.lessonService.createCategory({
        key,
        label,
        cover: coverImage.path,
      });
    }
    return this.lessonService.createCategory({ key, label });
  }

  @Post('lessons')
  @UseInterceptors(FileInterceptor('cover'))
  async createLesson(
    @UploadedFile() cover: Express.Multer.File,
    @Body() { key, label, parentKey }: CreateLessonDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.lessonService.createLesson({
        key,
        label,
        parentKey,
        cover: coverImage.path,
      });
    }
    return this.lessonService.createLesson({ key, label, parentKey });
  }

  @Patch('categories/:categoryId')
  @UseInterceptors(FileInterceptor('cover'))
  async updateCategory(
    @UploadedFile() cover: Express.Multer.File,
    @Param('categoryId') categoryId: string,
    @Body() { label }: UpdateCategoryDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.lessonService.updateCategory(categoryId, {
        label,
        cover: coverImage.path,
      });
    }
    return this.lessonService.updateCategory(categoryId, { label });
  }

  @Patch('lessons/:categoryId/:lessonId')
  @UseInterceptors(FileInterceptor('cover'))
  async updateLesson(
    @UploadedFile() cover: Express.Multer.File,
    @Param('categoryId') categoryId: string,
    @Param('lessonId') lessonId: string,
    @Body() { label, parentKey, content }: UpdateLessonDto,
  ) {    
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.lessonService.updateLesson(categoryId, lessonId, {
        label,
        parentKey,
        content,
        cover: coverImage.path,
      });
    }
    return this.lessonService.updateLesson(categoryId, lessonId, {
      label,
      parentKey,
      content,
    });
  }

  @Delete('categories/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this.lessonService.deleteCategory(categoryId);
  }

  @Delete('lessons/:categoryId/:lessonId')
  deleteLesson(
    @Param('categoryId') categoryId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonService.deleteLesson(categoryId, lessonId);
  }

  @Get('map')
  getMap() {
    return this.lessonService.getMap()
  }
}
