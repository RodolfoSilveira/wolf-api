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

  @Column({ type: "varchar" })
  file: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  type: string;

  @Column({ type: "varchar", nullable: true })
  subtype: string;

  @OneToOne(
    type => Company,
    company => company.id,
  )
  @Column({name: "company_id", nullable: true})
  @JoinColumn({name: "company_id"})
  company_id: number;

  @OneToOne(
    type => User,
    user => user.id,
  )
  @Column({name: "user_id", nullable: true})
  @JoinColumn({name: "user_id"})
  user_id: number;

  @ManyToOne(
    type => Task,
    task => task.id,
  )
  @Column({name: "task_id", nullable: true})
  @JoinColumn({name: "task_id"})
  task_id: number;

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
