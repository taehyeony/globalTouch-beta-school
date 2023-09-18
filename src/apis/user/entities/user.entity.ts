import { Field, ObjectType } from '@nestjs/graphql';
import { CountryCode } from 'src/apis/countryCode/entities/countryCode.entity';
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
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  profile_image_url: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @JoinColumn({ name: 'country_code' })
  @ManyToOne(() => CountryCode, { nullable: true })
  countryCode: CountryCode;
}
