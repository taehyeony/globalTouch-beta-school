import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { DonationService } from './donation.service';
import { DonationResolver } from './donation.resolver';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, User, Project])],
  providers: [DonationResolver, DonationService],
  exports: [DonationService],
})
export class DonationModule {}
