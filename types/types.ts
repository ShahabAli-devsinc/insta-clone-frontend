export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
}

export interface PostFormValues {
  caption: string;
  imageUrl: File | null;
}

export interface Post {
  id: number;
  userId: number;
  imageUrl: string;
  likes?: Like[];
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
  caption: string;
  user: User;
}

export interface Like {
  id: number;
  postId: number;
  userId: number;
  user: User;
  createdAt: Date;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  user: User;
  comment: string;
  createdAt: Date;
}
