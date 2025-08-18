export interface Comment {
  id: number;
  blogId: number;
  userId: string;
  content: string;
  date: string;
  replyTo?: number;
}
