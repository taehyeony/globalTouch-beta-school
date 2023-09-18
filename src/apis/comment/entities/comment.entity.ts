import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  comment_id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  comment_content: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
