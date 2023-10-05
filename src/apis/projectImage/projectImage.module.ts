import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImage } from './entities/projectImage.entity';
import { ProjectImageService } from './projectImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectImage])],
  providers: [ProjectImageService],
  exports: [ProjectImageService],
})
export class ProjectImageModule {}
