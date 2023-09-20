import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/createProject.input';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/common/interfaces/context';
import { ProjectImageService } from '../projectImage/projectImage.service';
// import { ProjectImage } from '../projectImage/entities/projectImage.entity';

@Resolver()
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectImageService: ProjectImageService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    //수정해야함
    @Args('projectImageUrl1', { nullable: true }) projectImageUrl1: string,
    @Args('projectImageUrl2', { nullable: true }) projectImageUrl2: string,
    @Args('projectImageUrl3', { nullable: true }) projectImageUrl3: string,
    @Context()
    context: IContext,
  ): Promise<Project> {
    const returnProject = await this.projectService.create({
      createProjectInput,
      context,
    });
    if (projectImageUrl1) {
      this.projectImageService.create({
        projectImageUrl: projectImageUrl1,
        projectTitle: createProjectInput.title,
      });
    }
    if (projectImageUrl2) {
      this.projectImageService.create({
        projectImageUrl: projectImageUrl2,
        projectTitle: createProjectInput.title,
      });
    }
    if (projectImageUrl3) {
      this.projectImageService.create({
        projectImageUrl: projectImageUrl3,
        projectTitle: createProjectInput.title,
      });
    }

    return returnProject;
  }
}
