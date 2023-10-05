import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { Donation } from '../donation/entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Project, User, Donation])],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
