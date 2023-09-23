import { IContext } from 'src/common/interfaces/context';

export interface ICommentServiceCreate {
  comment_content: string;
  projectId: string;
  context: IContext;
}
