import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';
import { Comment } from './entities/comment.entity';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  async createComment(
    @Args('commentContent') comment_content: string,
    @Args('projectId') projectId: string,
    @Context() context: IContext,
  ): Promise<Comment> {
    return this.commentService.create({ comment_content, projectId, context });
  }

  @Query(() => [Comment])
  async fetchComments(@Args('page') page: number): Promise<Comment[]> {
    return this.commentService.getOrderByTime({ page });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  async updateComment(
    @Args('commentId') commentId: string,
    @Args('updateContent') updateContent: string,
    @Context() context: IContext,
  ) {
    return this.commentService.updateComment({
      commentId,
      updateContent,
      context,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  async deleteComment(
    @Args('commentId') commentId: string,
    @Context() context: IContext,
  ): Promise<boolean> {
    return this.commentService.deleteComment({
      commentId,
      context,
    });
  }
}
