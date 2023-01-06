import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create Car', () => {
  let createCarUseCase: CreateCarUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it('should be able to create a car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with license plate already registered', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car2',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'abc-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Available Car',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
