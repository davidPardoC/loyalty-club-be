import { User } from '../users/entities/user.entity';
import { ICredentials } from './interfaces/credentials.interface';

export interface IBaseAuth {
  storeRefreshToken(user: User, refresh_token: string): Promise<User>;

  createCredentials(user: User): ICredentials;
}
