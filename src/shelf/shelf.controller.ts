import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { ImagesService } from 'src/images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/shelf')
export class ShelfController {
  constructor(
    private readonly shelfService: ShelfService,
    private readonly imageService: ImagesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('shelves')
  @UseInterceptors(FileInterceptor('cover'))
  async createShelf(
    @UploadedFile() cover: Express.Multer.File,
    @Body() { id, name }: CreateShelfDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.shelfService.createShelf({
        id,
        name,
        cover: coverImage.path,
      });
    }
    return this.shelfService.createShelf({ id, name });
  }

  @UseGuards(AuthGuard)
  @Post('books')
  @UseInterceptors(FileInterceptor('cover'))
  async createBook(
    @UploadedFile() cover: Express.Multer.File,
    @Body() { id, shelfId, name, data }: CreateBookDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.shelfService.createBook({
        id,
        shelfId,
        name,
        data,
        cover: coverImage.path,
      });
    }
    return this.shelfService.createBook({
      id,
      shelfId,
      name,
      data,
    });
  }

  @Get('shelves')
  findAllShelves() {
    return this.shelfService.findAllShelves();
  }

  @Get('shelves/:shelfId')
  findShelf(@Param('shelfId') shelfId: string) {
    return this.shelfService.findShelf(shelfId);
  }

  @Get('books')
  findAllBooks() {
    return this.shelfService.findAllBooks();
  }

  @Get('books/:shelfId')
  findAllBooksInShelf(@Param('shelfId') shelfId: string) {
    return this.shelfService.findAllBooksInShelf(shelfId);
  }

  @Get('books/:shelfId/:bookId')
  findBook(@Param('shelfId') shelfId: string, @Param('bookId') bookId: string) {
    return this.shelfService.findBookById(shelfId, bookId);
  }

  @UseGuards(AuthGuard)
  @Patch('shelves/:shelfId')
  @UseInterceptors(FileInterceptor('cover'))
  async updateShelf(
    @UploadedFile() cover: Express.Multer.File,
    @Param('shelfId') shelfId: string,
    @Body() shelf: UpdateShelfDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.shelfService.updateShelf(shelfId, {
        ...shelf,
        cover: coverImage.path,
      });
    }
    return this.shelfService.updateShelf(shelfId, shelf);
  }

  @UseGuards(AuthGuard)
  @Patch('books/:shelfId/:bookId')
  @UseInterceptors(FileInterceptor('cover'))
  async updateBook(
    @UploadedFile() cover: Express.Multer.File,
    @Param('shelfId') shelfId: string,
    @Param('bookId') bookId: string,
    @Body() book: UpdateBookDto,
  ) {
    if (cover) {
      const coverImage = await this.imageService.create(cover);
      return this.shelfService.updateBook(shelfId, bookId, {
        ...book,
        cover: coverImage.path,
      });
    }
    return this.shelfService.updateBook(shelfId, bookId, book);
  }

  @UseGuards(AuthGuard)
  @Delete('shelves/:shelfId')
  deleteShelf(@Param('shelfId') shelfId: string) {
    return this.shelfService.deleteShelfById(shelfId);
  }

  @UseGuards(AuthGuard)
  @Delete('books/:shelfId/:bookId')
  deleteBook(
    @Param('shelfId') shelfId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.shelfService.deleteBookById(shelfId, bookId);
  }
}
