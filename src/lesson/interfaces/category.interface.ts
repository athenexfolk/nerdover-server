export interface Category {
  key: string;
  label: string;
  cover?: string;
  createTime: Date;
  updateTime: Date;
}

interface Map {
  key: string;
  label: string;
}

export interface CategoryMap extends Map {
  lessons: Map[];
}
