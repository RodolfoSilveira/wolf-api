import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Company } from '../../company/entity/company.entity';
import { User } from '../../user/entity/user.entity';
import { File } from '../../file/entity/file.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(
    type => File,
    file => file,
  )
  files: File[];

  @ManyToOne(
    type => Company,
    company => company.tasks,
  )
  @JoinColumn({ name: 'company_id' })
  company_id: number;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'tasks_users',
    joinColumns: [{ name: 'task_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  users: User[];

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
