import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProjectImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  projectImage_id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  image_url: string;
}
