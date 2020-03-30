import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Company } from '../../company/entity/company.entity';
import { User } from '../../user/entity/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @ManyToOne(
    type => Company,
    company => company.id,
  )
  @Column({ name: "company_id" })
  @JoinColumn({name: "company_id"})
  company_id: number;

  @ManyToMany(
    type => User
  )
  @JoinTable({
    name: 'tasks_users',
    joinColumns: [
      { name: 'task_id' }
    ],
    inverseJoinColumns: [
        { name: 'user_id' }
    ]
  })
  users: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: number;
}
