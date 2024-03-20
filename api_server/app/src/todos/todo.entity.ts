import { IsNotEmpty, Length } from 'class-validator';
import { User } from '../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.todos, {
    createForeignKeyConstraints: true,
    persistence: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  readonly user?: User;

  @IsNotEmpty({ message: 'タイトルは必須です。' })
  @Length(1, 255, {
    message: '$constraint1文字以上$constraint2文字以下での入力をお願いします。',
  })
  @Column()
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content!: string;
}
