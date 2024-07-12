import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { IBaseAuth } from './base.auth.service';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { GoogleUser } from './interfaces/google-user';

@Injectable()
export class GoogleAuthService implements IBaseAuth {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async googleLogin(googleUser: GoogleUser) {
    let user = await this.userRepository.findOneBy({ email: googleUser.email });

    if (!user) {
      user = this.userRepository.create({
        email: googleUser.email,
        first_name: googleUser.firstName,
        last_name: googleUser.lastName,
        picture: googleUser.picture,
        auth_provider: AuthProviderEnum.GOOGLE,
      });
      user = await this.userRepository.save(user);
    }

    const credentials = this.createCredentials(user);

    await this.storeRefreshToken(user, credentials.refresh_token);

    return credentials;
  }

  storeRefreshToken(user: User, refresh_token: string): Promise<User> {
    user.refresh_token = refresh_token;
    return this.userRepository.save(user);
  }

  createCredentials(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: this.jwtService.sign(
        { email: payload.email },
        { expiresIn: '7d', secret: process.env.REFRESH_TOKEN_SECRET },
      ),
    };
  }
}
