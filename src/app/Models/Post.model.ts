export interface Post {
  id: number;
  title: string;
  comments: Comments[]
}

export interface Comments {
  id: number;
  description: string
}
