import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_STATUS_EMUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(PAYMENT_STATUS_EMUM, {
  name: 'PAYMENT_STATUS_EMUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  payment_id: string;

  @Column({ type: 'int', width: 20 })
  @Field(() => Int)
  payment_amount: number;

  @Column({ type: 'enum', enum: PAYMENT_STATUS_EMUM })
  @Field(() => PAYMENT_STATUS_EMUM)
  payment_status: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
