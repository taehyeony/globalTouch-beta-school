import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/apis/project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @JoinColumn({ name: 'project_id' })
  @ManyToOne(() => Project)
  project: Project;
}
