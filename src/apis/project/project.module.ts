import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { User } from '../user/entities/user.entity';
import { ProjectCategory } from '../projectCategory/entities/projectCategory.entity';
import { ProjectImage } from '../projectImage/entities/projectImage.entity';
import { ProjectImageService } from '../projectImage/projectImage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, ProjectCategory, ProjectImage]),
  ],
  providers: [ProjectResolver, ProjectService, ProjectImageService],
  exports: [ProjectService],
})
export class ProjectModule {}
