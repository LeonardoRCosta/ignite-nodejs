import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('Create Rental', () => {
  const dayPlus24Hours = dayjs().add(1, 'day').toDate();

  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalsRepository: InMemoryRentalsRepository;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let dayjsDateProvider: DayjsDateProvider;

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository
    );
  });

  it('should be able to create a rental', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'test',
      description: 'test description',
      daily_rate: 100,
      license_plate: 'test license_plate',
      fine_amount: 30,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a rental if there is another rental open to the same user', async () => {
    await inMemoryRentalsRepository.create({
      car_id: '12345',
      expected_return_date: dayPlus24Hours,
      user_id: 'teste',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'teste',
        car_id: '321',
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(new AppError('This user has an in progress rental'));
  });

  it('should not be able to create a rental if there is another rental open to the same car', async () => {
    await inMemoryRentalsRepository.create({
      car_id: '12345',
      expected_return_date: dayPlus24Hours,
      user_id: 'teste',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'teste2',
        car_id: '12345',
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(new AppError('This car is unavailable'));
  });

  it('should not be able to create a rental if the return date is lower than 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return date'));
  });
});
