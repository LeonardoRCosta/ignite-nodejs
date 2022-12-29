import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minHours = 24;
    const carUnavailable = await this.rentalsRepository.findRentalByCarId(
      car_id
    );

    if (carUnavailable) throw new AppError('This car is unavailable');

    const user = await this.rentalsRepository.findRentalByUserId(user_id);

    if (user) throw new AppError('This user has an in progress rental');

    const expectedReturnDateFormated = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const hours = dayjs(expectedReturnDateFormated).diff(dateNow, 'hours');

    if (hours < minHours) throw new AppError('Invalid return date');

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
