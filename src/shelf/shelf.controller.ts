import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Controller('api/shelf')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @UseGuards(AuthGuard)
  @Post('shelves')
  createShelf(@Body() { id, name }: CreateShelfDto) {
    return this.shelfService.createShelf(id, name);
  }

  @UseGuards(AuthGuard)
  @Post('books')
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.shelfService.createBook(createBookDto);
  }

  @Get('shelves')
  findAllShelves() {
    return this.shelfService.findAllShelves();
  }

  @Get('books')
  findAllBooks() {
    return this.shelfService.findAllBooks();
  }

  @Get('books/:shelfId')
  findAllBooksInShelf(@Param('shelfId') shelfId: string) {
    return this.shelfService.findAllBooksInShelf(shelfId); //
  }

  @Get('books/:shelfId/:bookId')
  findBook(@Param('shelfId') shelfId: string, @Param('bookId') bookId: string) {
    return this.shelfService.findBookById(shelfId, bookId);
  }

  @UseGuards(AuthGuard)
  @Patch('shelves/:shelfId')
  updateShelf(
    @Param('shelfId') shelfId: string,
    @Body() shelf: UpdateShelfDto,
  ) {    
    return this.shelfService.updateShelf(shelfId, shelf);
  }

  @UseGuards(AuthGuard)
  @Patch('books/:shelfId/:bookId')
  updateBook(
    @Param('shelfId') shelfId: string,
    @Param('bookId') bookId: string,
    @Body() book: UpdateBookDto,
  ) {
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
