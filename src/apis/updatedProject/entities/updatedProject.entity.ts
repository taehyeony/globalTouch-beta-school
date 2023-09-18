import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UpdatedProject {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  updatedProject_id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
