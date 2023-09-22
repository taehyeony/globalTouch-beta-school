import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import {
  IProjectServiceCreate,
  IProjectServiceGetOneById,
} from './interfaces/project-service.interface';
import { User } from '../user/entities/user.entity';
import { ProjectCategory } from './../projectCategory/entities/projectCategory.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ProjectCategory)
    private readonly projectCategoryRepository: Repository<ProjectCategory>,
  ) {
    // 더미 데이터, 자료 수집 이후에 삭제
    const projectCategory = this.projectCategoryRepository.findOne({
      where: { name: 'AA' },
    });
    if (!projectCategory) {
      this.projectCategoryRepository.save({
        name: 'AA',
      });
    }
  }

  async create({
    createProjectInput,
    context,
  }: IProjectServiceCreate): Promise<Project> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });
    if (!user) {
      throw new Error('Not found User');
    }

    const projectCategory = await this.projectCategoryRepository.findOne({
      where: { name: createProjectInput.productCategory_name },
    });
    if (!projectCategory) {
      throw new Error('Not found projectCategory');
    }

    const project = {
      //context.req.user.user_id,
      user: user, //user에 User 객체를 findOne 해서 넣어줘야함
      projectCategory: projectCategory,
      ...createProjectInput,
    };
    return this.projectRepository.save(project);
  }

  async getOneById({ projectId }: IProjectServiceGetOneById): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { project_id: projectId },
    });
  }
}
