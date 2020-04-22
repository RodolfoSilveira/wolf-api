export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  token?: string;
  token_created_at?: Date;
  company_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
