import { Schema } from 'mongoose';

export const ShelfCollectionName = 'Shelves';

export const ShelfSchema = new Schema(
  {
    id: String,
    name: String,
    cover: String
  },
  {
    collection: ShelfCollectionName,
  },
);
