import { IContext } from 'src/common/interfaces/context';
import { DONATION_STATUS_ENUM } from '../entities/donation.entity';

export interface IDonationCreate {
  imp_uid: string;
  donation_status: DONATION_STATUS_ENUM;
  donation_amount: number;
  projectId: string;
  context: IContext;
}
