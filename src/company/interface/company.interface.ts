import { User } from '../../user/entity/user.entity';
import { Address } from '../../address/entity/address.entity';
import { Phone } from 'src/phone/entity/phone.entity';
import { Task } from 'src/task/entity/task.entity';

export interface ICompany {
  id?: number;
  name: string;
  fantasyName: string;
  cnpj: string;
  users?: User[];
  addresses?: Address[];
  phones?: Phone[];
  tasks?: Task[];
}
