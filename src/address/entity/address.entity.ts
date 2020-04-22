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

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'varchar' })
  neighborhood: string;

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  cep: string;

  @ManyToOne(
    type => Company,
    company => company.addresses,
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
