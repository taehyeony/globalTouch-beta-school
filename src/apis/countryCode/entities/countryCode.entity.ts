import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CountryCode {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  country_code: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  lat: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  lng: number;
}
