export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  token?: string;
  token_created_at?: string
  createdAt?: number;
  updatedAt?: number;
}
