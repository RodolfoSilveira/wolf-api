import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.tokens,
  )
  @JoinColumn({name: "user_id"})
  user_id: User;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'boolean', default: false })
  is_revoked: boolean;

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
