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
  likes?: number;
  comments?: number;
  createdAt?: Date;
  updatedAt?: Date;
  caption: string;
  user: User;
}
