import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

describe('Create car specifcation', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it('should be able to add a specificaiton to the car', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await inMemorySpecificationsRepository.create({
      description: 'test',
      name: 'test',
    });

    const specifications_ids = [specification.id];

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });

    expect(carWithSpecifications).toHaveProperty('specifications');
    expect(carWithSpecifications.specifications.length).toEqual(1);
  });

  it('should not be able to add a specificaiton to a non existent car', async () => {
    const car_id = '1234';
    const specifications_ids = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      })
    ).rejects.toEqual(new AppError('Car not found', 404));
  });
});
