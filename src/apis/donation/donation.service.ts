import { Injectable } from '@nestjs/common';
import { Donation } from './entities/donation.entity';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
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
    const beforeAmount = project.amount_raised;

    let donation: Donation;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      donation = await this.donationRepository.save({
        imp_uid: imp_uid,
        donation_amount: donation_amount,
        donation_status: donation_status,
        user: user,
        project: project,
      });
      await this.projectRepository.update(project.project_id, {
        amount_raised: beforeAmount + donation_amount,
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return donation;
  }
}
