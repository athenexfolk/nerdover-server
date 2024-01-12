import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
  {
    key: String,
    icon: String,
    label: String,
  },
  {
    collection: 'categories',
  },
);
