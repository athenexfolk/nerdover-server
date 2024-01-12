import { Controller, Get, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';

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
}
