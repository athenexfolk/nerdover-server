export interface Lesson {
  key: string;
  label: string;
  parentKey: string;
  cover?: string;
  content: string;
  createTime: Date;
  UpdateTime: Date;
}