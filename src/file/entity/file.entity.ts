import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Company } from '../../company/entity/company.entity';
import { User } from '../../user/entity/user.entity';
import { Task } from '../../task/entity/task.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  file: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  subtype: string;

  @OneToOne(type => Company)
  @JoinColumn({ name: 'company_id' })
  company_id: Company;

  @OneToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne(
    type => Task,
    task => task.files,
  )
  @JoinColumn({ name: 'task_id' })
  task_id: Task;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updated_at: Date;
}
