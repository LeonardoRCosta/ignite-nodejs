import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError('Refresh token does not exists');

    await this.usersTokensRepository.delete(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.refresh_token_expires_in,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.refresh_token_expires_in_days
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    const new_token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.token_expires_in,
    });

    return { refresh_token, token: new_token };
  }
}

export { RefreshTokenUseCase };
