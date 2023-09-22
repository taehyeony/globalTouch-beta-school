import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/apis/project/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProjectImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  projectImage_id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  image_url: string;

  @JoinColumn({ name: 'project_id' })
  @ManyToOne(() => Project)
  @Field(() => Project)
  project: Project;
}
