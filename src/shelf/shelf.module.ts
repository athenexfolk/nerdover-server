import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelfSchema } from './schemas/shelf.schema';
import { BookSchema } from './schemas/book.schema';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Shelf', schema: ShelfSchema },
      { name: 'Book', schema: BookSchema },
    ]),
    ImagesModule,
  ],
  controllers: [ShelfController],
  providers: [ShelfService],
})
export class ShelfModule {}
