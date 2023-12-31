import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/createProject.input';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @Args('projectImageUrls', { nullable: true }) projectImageUrls: string,
    @Context()
    context: IContext,
  ): Promise<Project> {
    const returnProject = await this.projectService.create({
      createProjectInput,
      projectImageUrls,
      context,
    });
    return returnProject;
  }

  @Query(() => Project)
  async fetchProject(@Args('projectId') projectId: string): Promise<Project> {
    return this.projectService.getOneById({ projectId });
  }

  @Query(() => [Project])
  async fetchNewProjects(@Args('page') page: number): Promise<Project[]> {
    return this.projectService.getOrderByTime({ page });
  }

  @Query(() => [Project])
  async fetchProjectsByCountry(
    @Args('countryCodeId') countryCodeId: string,
    @Args('page') page: number,
  ): Promise<Project[]> {
    return this.projectService.getByCountryCode({ countryCodeId, page });
  }

  @Query(() => [Project])
  async fetchPopularProjects(@Args('page') page: number) {
    return this.projectService.getOrderByDonors({ page });
  }
}
