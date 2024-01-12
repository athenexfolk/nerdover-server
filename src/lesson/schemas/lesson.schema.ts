import { Schema } from 'mongoose';

export const LessonSchema = new Schema(
  {
    key: String,
    icon: String,
    label: String,
    tags: [String],
    parentKey: String,
    content: String,
  },
  {
    collection: 'lessons',
  },
);
