import { Schema } from 'mongoose';

export const LessonSchema = new Schema(
  {
    key: String,
    label: String,
    cover: String,
    parentKey: String,
    content: String,
  },
  {
    collection: 'lessons',
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  },
);
