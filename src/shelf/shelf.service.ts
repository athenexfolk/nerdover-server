import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelf } from './interfaces/shelf.interface';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Injectable()
export class ShelfService {
  constructor(
    @InjectModel('Shelf') private readonly shelfRepository: Model<Shelf>,
    @InjectModel('Book') private readonly bookRepository: Model<Book>,
  ) {}

  public async createShelf(shelfId: string, name: string) {
    return await this.shelfRepository.create({ id: shelfId, name });
  }

  public async findAllShelves() {
    return await this.shelfRepository.find({}, { _id: 0 });
  }

  public async updateShelf(shelfId: string, shelf: UpdateShelfDto) {
    return await this.shelfRepository.findOneAndUpdate({ id: shelfId }, shelf, {
      new: true,
    });
  }

  public async deleteShelfById(shelfId: string) {
    return await this.shelfRepository.findOneAndDelete(
      { id: shelfId },
      { new: true },
    );
  }

  public async createBook(book: CreateBookDto) {
    return await this.bookRepository.create(book);
  }

  public async findAllBooks() {
    return await this.bookRepository.find({}, { _id: 0 });
  }

  public async findAllBooksInShelf(shelfId: string) {
    return await this.bookRepository.find({ shelfId });
  }

  public async findBookById(shelfId: string, bookId: string) {
    return await this.bookRepository.findOne({ id: bookId, shelfId });
  }

  public async updateBook(
    shelfId: string,
    bookId: string,
    book: UpdateBookDto,
  ) {
    return await this.bookRepository.findOneAndUpdate(
      { id: bookId, shelfId: shelfId },
      book,
      { new: true },
    );
  }

  public async deleteBookById(shelfId: string, bookId: string) {
    return await this.bookRepository.findOneAndDelete(
      { id: bookId, shelfId },
      { new: true },
    );
  }
}
