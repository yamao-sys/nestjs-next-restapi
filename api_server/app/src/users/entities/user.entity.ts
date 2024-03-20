import { Todo } from '../../todos/todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column()
  email!: string;

  @Column({ type: 'text' })
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos?: Todo[];
}
