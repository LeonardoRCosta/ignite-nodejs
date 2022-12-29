import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('Create Rental', () => {
  const dayPlus24Hours = dayjs().add(1, 'day').toDate();

  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalsRepository: InMemoryRentalsRepository;

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository);
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a rental if there is another rental open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'teste',
        car_id: '123',
        expected_return_date: dayPlus24Hours,
      });

      await createRentalUseCase.execute({
        user_id: 'teste',
        car_id: '321',
        expected_return_date: dayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if there is another rental open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayPlus24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'teste',
        expected_return_date: dayPlus24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if the return date is lower than 24 hours', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
