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
import { ProjectImageService } from '../projectImage/projectImage.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ProjectCategory)
    private readonly projectCategoryRepository: Repository<ProjectCategory>,

    private readonly projectImageService: ProjectImageService,
  ) {}

  async create({
    createProjectInput,
    projectImageUrls,
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
      user: user,
      projectCategory: projectCategory,
      ...createProjectInput,
    };
    const return_project = await this.projectRepository.save(project);

    //url 저장
    const imageUrl = projectImageUrls.split('https://').slice(1);
    if (imageUrl.length > 3) {
      throw new Error('Too many image(max 3 pic)');
    }
    await imageUrl.map((url) => {
      this.projectImageService.create({
        projectImageUrl: url,
        projectTitle: project.title,
      });
    });

    return return_project;
  }

  async getOneById({ projectId }: IProjectServiceGetOneById): Promise<Project> {
    return await this.projectRepository.findOne({
      relations: ['projectCategory', 'user'],
      where: { project_id: projectId },
    });
  }
}
