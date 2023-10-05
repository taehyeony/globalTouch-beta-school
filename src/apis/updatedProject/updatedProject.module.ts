import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpdatedProjectService } from './updatedProject.service';
import { UpdatedProjectResolver } from './updatedProject.resolver';
import { UpdatedProject } from './entities/updatedProject.entity';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UpdatedProject, User, Project])],
  providers: [UpdatedProjectResolver, UpdatedProjectService],
  exports: [UpdatedProjectService],
})
export class UpdatedProjectModule {}
