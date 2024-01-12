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

  public async createCategory({ key, label, icon }: CreateCategoryDto) {
    return await this.categoryRepository.create({ key, label, icon });
  }

  public async createLesson({
    key,
    label,
    icon,
    parentKey,
    tags,
    content,
  }: CreateLessonDto) {
    return await this.lessonRepository.create({
      key,
      label,
      icon,
      parentKey,
      tags,
      content,
    });
  }

  public async updateCategory({ key, label, icon }: UpdateCategoryDto) {
    return await this.categoryRepository.findOneAndUpdate(
      { key },
      { label, icon },
      { new: true },
    );
  }

  public async updateLesson(
    oldCategoryId: string,
    { key, label, icon, parentKey, tags, content }: UpdateLessonDto,
  ) {
    return await this.lessonRepository.findOneAndUpdate(
      { parentKey: oldCategoryId, key },
      { label, icon, parentKey, tags, content },
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
