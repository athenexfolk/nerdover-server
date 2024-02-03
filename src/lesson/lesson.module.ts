import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { LessonSchema } from './schemas/lesson.schema';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Lesson',
        schema: LessonSchema,
      },
    ]),
    ImageModule
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
