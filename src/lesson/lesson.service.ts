import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Lesson } from './interfaces/lesson.interface';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel('Category')
    private readonly categoryRepository: Model<Category>,
    @InjectModel('Lesson')
    private readonly lessonRepository: Model<Lesson>,
  ) {}

  public async findAllCategories() {
    return await this.categoryRepository.find({});
  }

  public async findCategoryById(categoryId: string) {
    return await this.categoryRepository.findOne({ key: categoryId });
  }

  public async findAllLessons() {
    return await this.lessonRepository.find({});
  }

  public async findAllLessonsByCategoryId(categoryId: string) {
    return await this.lessonRepository.find({ parentKey: categoryId });
  }

  public async findLessonById(categoryId: string, lessonId: string) {
    return await this.lessonRepository.findOne({
      parentKey: categoryId,
      key: lessonId,
    });
  }
}
