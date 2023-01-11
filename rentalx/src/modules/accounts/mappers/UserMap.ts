import { instanceToInstance } from 'class-transformer';
import { IUserProfileDTO } from '../dtos/IUserProfileDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    name,
    email,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserProfileDTO {
    const user = instanceToInstance({
      name,
      email,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
