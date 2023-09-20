import { IContext } from 'src/common/interfaces/context';
import { CreateProjectInput } from '../dto/createProject.input';

export interface IProjectServiceCreate {
  createProjectInput: CreateProjectInput;
  context: IContext;
}
