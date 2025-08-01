export interface Blog {
  id: number;
  title: string;
  comments: number[];
  description: string;
  contents: string;
  images: string[];
  categories: number[];
  tags: number[];
  date: string;
  created_at: string;
}
