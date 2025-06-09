export interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  comments: Comment[];

}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}
