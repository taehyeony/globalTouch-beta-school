import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @Field(() => String)
  email: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @Field(() => String)
  google_id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  profile_image_url: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
