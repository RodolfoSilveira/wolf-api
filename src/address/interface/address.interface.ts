export interface IAddress {
  id?: number;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  company_id: number;
  created_at?: Date;
  updated_at?: Date;
}
