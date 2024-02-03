export interface CreateLessonDto {
  key: string;
  label: string;
  parentKey: string;
  cover?: string;
  content?: string;
}
