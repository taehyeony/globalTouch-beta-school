import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { DonationService } from './donation.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { DONATION_STATUS_ENUM, Donation } from './entities/donation.entity';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class DonationResolver {
  constructor(private readonly donationService: DonationService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Donation)
  async createDonation(
    @Args('impUid') imp_uid: string,
    @Args('donationStatus') donation_status: DONATION_STATUS_ENUM,
    @Args('donationAmount') donation_amount: number,
    @Args('projectId') projectId: string,
    @Context() context: IContext,
  ) {
    return this.donationService.create({
      imp_uid,
      donation_status,
      donation_amount,
      projectId,
      context,
    });
  }
}
