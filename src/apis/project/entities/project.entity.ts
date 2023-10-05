import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectCategory } from 'src/apis/projectCategory/entities/projectCategory.entity';
import { User } from 'src/apis/user/entities/user.entity';
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

  @Column({ type: 'int', width: 20, default: 0 })
  @Field(() => Int)
  count_donors: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @JoinColumn({ name: 'productCategory_id' })
  @ManyToOne(() => ProjectCategory)
  @Field(() => ProjectCategory)
  projectCategory: ProjectCategory;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
