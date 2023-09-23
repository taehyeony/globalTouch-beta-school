import { IContext } from 'src/common/interfaces/context';

export interface ICommentServiceCreate {
  comment_content: string;
  projectId: string;
  context: IContext;
}

export interface ICommentServiceGetOrderByTime {
  page: number;
}

export interface ICommentServiceUpdate {
  commentId: string;
  updateContent: string;
  context: IContext;
}
