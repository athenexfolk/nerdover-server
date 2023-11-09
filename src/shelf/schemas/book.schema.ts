import { Schema } from 'mongoose';

export const BookCollectionName = 'Books';

export const BookSchema = new Schema(
  {
    id: String,
    shelfId: String,
    name: String,
    data: String,
    cover: String
  },
  {
    collection: BookCollectionName,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
