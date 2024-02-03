import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
  {
    key: String,
    label: String,
    cover: String,
  },
  {
    collection: 'categories',
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  },
);
