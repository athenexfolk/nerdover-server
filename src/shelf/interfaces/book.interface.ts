export interface BookDescription {
  id: string;
  shelfId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book extends BookDescription {
  data: string;
}
