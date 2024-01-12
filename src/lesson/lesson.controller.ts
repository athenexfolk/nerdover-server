import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('api/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

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
  createCategory(@Body() category: CreateCategoryDto) {
    return this.lessonService.createCategory(category);
  }

  @Post('lessons')
  createLesson(@Body() lesson: CreateLessonDto) {
    return this.lessonService.createLesson(lesson);
  }

  @Patch('categories/:categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() category: CreateCategoryDto,
  ) {
    return this.lessonService.updateCategory({ ...category, key: categoryId });
  }

  @Patch('lessons/:categoryId/:lessonId')
  updateLesson(
    @Param('categoryId') categoryId: string,
    @Param('lessonId') lessonId: string,
    @Body() lesson: UpdateLessonDto,
  ) {
    return this.lessonService.updateLesson(categoryId, {
      ...lesson,
      key: lessonId,
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
}
