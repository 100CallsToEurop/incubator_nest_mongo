import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';

import { UserInputModel } from '../../api/models';

import {
  IAccount,
  IEmailConfirmation,
  IPasswordRecovery,
  IUser,
} from '../interfaces/user.interface';

export class UserEntity implements IUser {
  _id?: Types.ObjectId;
  accountData: IAccount;
  emailConfirmation: IEmailConfirmation;
  passwordRecovery: IPasswordRecovery

  constructor(user: UserInputModel, passwordHash, isConfirmed?: boolean) {
    this._id = new Types.ObjectId();
    this.accountData = {
      login: user.login,
      email: user.email,
      passwordHash,
      createdAt: new Date(),
    };
    this.emailConfirmation = {
      confirmationCode: uuidv4(),
      expirationDate: add(new Date(), {
        hours: 1,
        minutes: 3,
      }),
      isConfirmed: isConfirmed ? true : false,
    };
    this.passwordRecovery = {
      passwordRecoveryCode: uuidv4(),
      expirationDate: add(new Date(), {
        hours: 1,
        minutes: 3,
      }),
      isConfirmedPassword: false,
    };
  }
}
