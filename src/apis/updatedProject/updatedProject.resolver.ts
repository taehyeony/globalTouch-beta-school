import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdatedProjectService } from './updatedProject.service';
import { UpdatedProject } from './entities/updatedProject.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class UpdatedProjectResolver {
  constructor(private readonly updatedProjectService: UpdatedProjectService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => UpdatedProject)
  async createUpdatedProject(
    @Args('content') content: string,
    @Args('projectId') projectId: string,
    @Context() context: IContext,
  ): Promise<UpdatedProject> {
    return this.updatedProjectService.createUpdatedProject({
      content,
      projectId,
      context,
    });
  }

  @Query(() => [UpdatedProject])
  async fetchUpdatedProjects(
    @Args('projectId') projectId: string,
  ): Promise<UpdatedProject[]> {
    return this.updatedProjectService.getUpdatedProject({
      projectId,
    });
  }
}
