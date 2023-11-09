export interface BookDescription {
  id: string;
  shelfId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  cover?: string
}

export interface Book extends BookDescription {
  data: string;
}
