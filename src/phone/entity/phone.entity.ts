import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Company } from '../../company/entity/company.entity';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar', unique: true })
  number: string;

  @ManyToOne(
    type => Company,
    company => company.phones,
  )
  @JoinColumn({ name: 'company_id' })
  company_id: Company;

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
