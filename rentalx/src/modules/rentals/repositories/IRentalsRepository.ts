import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findRentalByCarId(car_id: string): Promise<Rental>;
  findRentalByUserId(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };