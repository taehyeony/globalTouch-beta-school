import { IContext } from 'src/common/interfaces/context';

export interface IUpdatedServiceCreate {
  content: string;
  projectId: string;
  context: IContext;
}
