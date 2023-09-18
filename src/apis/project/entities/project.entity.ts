import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  project_id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @Column({ type: 'int', width: 20 })
  @Field(() => Int)
  amount_required: number;

  @Column({ type: 'int', width: 20, default: 0 })
  @Field(() => Int)
  amount_raised: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
