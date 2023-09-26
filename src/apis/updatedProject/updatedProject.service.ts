import { Injectable } from '@nestjs/common';
import { UpdatedProject } from './entities/updatedProject.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdatedServiceCreate } from './interfaces/updatedProject-service.interface';
import { User } from '../user/entities/user.entity';
import { Project } from './../project/entities/project.entity';
@Injectable()
export class UpdatedProjectService {
  constructor(
    @InjectRepository(UpdatedProject)
    private readonly updatedProjectRepository: Repository<UpdatedProject>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createUpdatedProject({
    content,
    projectId,
    context,
  }: IUpdatedServiceCreate): Promise<UpdatedProject> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });
    if (!user) {
      throw new Error('Not found User');
    }
    const project = await this.projectRepository.findOne({
      relations: ['user'],
      where: { project_id: projectId },
    });
    if (!project) {
      throw new Error('Not found project');
    }
    if (project.user.user_id != context.req.user.user_id) {
      throw new Error('Not authorized');
    }
    return this.updatedProjectRepository.save({
      content,
      project,
    });
  }
}
