import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Lesson } from './interfaces/lesson.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

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

  public async createCategory(newCategory: CreateCategoryDto) {
    return await this.categoryRepository.create(newCategory);
  }

  public async createLesson(createLesson: CreateLessonDto) {
    return await this.lessonRepository.create(createLesson);
  }

  public async updateCategory(categoryId: string, category: UpdateCategoryDto) {
    return await this.categoryRepository.findOneAndUpdate(
      { key: categoryId },
      category,
      { new: true },
    );
  }

  public async updateLesson(
    categoryId: string,
    lessonId: string,
    lesson: UpdateLessonDto,
  ) {
    return await this.lessonRepository.findOneAndUpdate(
      { parentKey: categoryId, key: lessonId },
      lesson,
      { new: true },
    );
  }

  public async deleteCategory(categoryId: string) {
    return this.categoryRepository.findOneAndDelete({ key: categoryId });
  }

  public async deleteLesson(categoryId: string, lessonId: string) {
    return this.lessonRepository.findOneAndDelete({
      parentKey: categoryId,
      key: lessonId,
    });
  }
}
