import { Injectable } from '@nestjs/common';
import { ProjectImage } from './entities/projectImage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProjectImageUrlInput } from './interfaces/projectImage-service.interface';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class ProjectImageService {
  constructor(
    @InjectRepository(ProjectImage)
    private readonly projectImageRepository: Repository<ProjectImage>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create({
    projectImageUrl,
    projectTitle,
  }: IProjectImageUrlInput): Promise<ProjectImage> {
    console.log(projectTitle);
    const project = await this.projectRepository.findOne({
      where: { title: projectTitle },
    });
    if (!project) {
      throw new Error('Not found Project');
    }
    return this.projectImageRepository.save({
      project: project,
      image_url: projectImageUrl,
    });
  }
}
