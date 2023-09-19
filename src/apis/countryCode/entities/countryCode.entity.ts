import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CountryCode {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  coutryCode_id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  name: string;
}
