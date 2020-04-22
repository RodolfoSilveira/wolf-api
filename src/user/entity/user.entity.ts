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
import { Company } from 'src/company/entity/company.entity';
import { Token } from 'src/token/entity/tokens.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;

  @Column({ type: 'timestamp', nullable: true })
  token_created_at: Date;

  @ManyToOne(
    type => Company,
    company => company.users,
  )
  @JoinColumn({ name: 'company_id' })
  company_id: Company;

  @OneToMany(
    type => Token,
    token => token,
  )
  tokens: Token[];

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
