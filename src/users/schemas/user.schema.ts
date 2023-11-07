import { Schema } from 'mongoose';

export const UserCollectionName = 'Users';

export const UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: UserCollectionName,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
