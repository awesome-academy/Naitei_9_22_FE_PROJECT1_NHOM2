export interface Comment {
  id: number;
  blogId: number;
  userId: number;
  content: string;
  date: string;
  replyTo?: number;
}
