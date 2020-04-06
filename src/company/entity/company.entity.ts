import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Address } from '../../address/entity/address.entity';
import { Phone } from 'src/phone/entity/phone.entity';
import { Task } from 'src/task/entity/task.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  fantasyName: string;

  @Column({ type: 'varchar', unique: true })
  cnpj: string;

  @OneToMany(
    type => User,
    user => user,
  )
  users: User[];

  @OneToMany(
    type => Address,
    address => address,
  )
  addresses: Address[];

  @OneToMany(
    type => Phone,
    phone => phone,
  )
  phones: Phone[];

  @OneToMany(
    type => Task,
    task => task,
  )
  tasks: Task[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: number;
}
