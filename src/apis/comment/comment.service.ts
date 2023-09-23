import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICommentServiceCreate,
  ICommentServiceGetOrderByTime,
} from './interfaces/comment-service.interface';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create({
    comment_content,
    projectId,
    context,
  }: ICommentServiceCreate): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });
    if (!user) {
      throw new Error('Not found User');
    }
    const project = await this.projectRepository.findOne({
      where: { project_id: projectId },
    });
    if (!project) {
      throw new Error('Not found project');
    }
    return this.commentRepository.save({
      comment_content,
      user,
      project,
    });
  }

  async getOrderByTime({
    page,
  }: ICommentServiceGetOrderByTime): Promise<Comment[]> {
    const take = 10;
    const comments = await this.commentRepository.findAndCount({
      relations: ['project', 'user'],
      order: { created_at: 'DESC' },
      take: take,
      skip: (page - 1) * take,
    });
    return comments[0];
  }
}
