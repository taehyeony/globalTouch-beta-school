import { Injectable } from '@nestjs/common';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDonationCreate } from './interfaces/donation-service.interface';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';
@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create({
    imp_uid,
    donation_status,
    donation_amount,
    projectId,
    context,
  }: IDonationCreate): Promise<Donation> {
    const user = await this.userRepository.findOne({
      where: { user_id: context.req.user.user_id },
    });
    if (!user) {
      throw new Error('Not found User');
    }
    const project = await this.projectRepository.findOne({
      relations: ['user'],
      where: { project_id: projectId },
    });
    if (!project) {
      throw new Error('Not found project');
    }

    return this.donationRepository.save({
      donation_id: imp_uid,
      donation_amount: donation_amount,
      donation_status: donation_status,
      user: user,
      project: project,
    });
  }
}
