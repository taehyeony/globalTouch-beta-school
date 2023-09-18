import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProjectCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  productCategory_id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  name: string;
}
