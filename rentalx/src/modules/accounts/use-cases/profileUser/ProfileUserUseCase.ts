import { IUserProfileDTO } from '@modules/accounts/dtos/IUserProfileDTO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserProfileDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
