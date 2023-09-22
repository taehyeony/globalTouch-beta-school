import { IContext } from 'src/common/interfaces/context';
import { CreateProjectInput } from '../dto/createProject.input';

export interface IProjectServiceCreate {
  createProjectInput: CreateProjectInput;
  projectImageUrls: string;
  context: IContext;
}
export interface IProjectServiceGetOneById {
  projectId: string;
}
export interface IProjectServiceGetOrderByTime {
  page: number;
}

export interface IProjectServiceGetByCountryCode {
  countryCodeId: string;
  page: number;
}
