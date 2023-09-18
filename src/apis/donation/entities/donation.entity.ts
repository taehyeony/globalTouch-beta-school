import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  donation_id: string;

  @Column({ type: 'int', width: 20 })
  @Field(() => Int)
  amount_donated: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
