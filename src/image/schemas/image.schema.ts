import { Schema } from 'mongoose';

export const ImageCollectionName = 'Images';

export const ImageSchema = new Schema(
  {
    path: String,
  },
  {
    collection: ImageCollectionName,
    timestamps: {
      createdAt: 'createTime',
      updatedAt: false,
    },
  },
);
