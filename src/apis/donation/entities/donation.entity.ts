import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Project } from 'src/apis/project/entities/project.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum DONATION_STATUS_ENUM {
  COMPLETED = 'COMPLETED',
  CANCEL = 'CANCEL',
}

registerEnumType(DONATION_STATUS_ENUM, { name: 'DONATION_STATUS_ENUM' });

@Entity()
@ObjectType()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  donation_id: string;

  @Column()
  @Field(() => String)
  imp_uid: string;

  @Column({ type: 'int', width: 20 })
  @Field(() => Int)
  donation_amount: number;

  @Column({ type: 'enum', enum: DONATION_STATUS_ENUM })
  @Field(() => DONATION_STATUS_ENUM)
  donation_status: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @JoinColumn({ name: 'project_id' })
  @ManyToOne(() => Project)
  project: Project;
}
