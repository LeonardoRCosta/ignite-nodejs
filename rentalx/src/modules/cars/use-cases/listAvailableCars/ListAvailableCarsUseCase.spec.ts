import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('List Cars', () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 130.0,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car Brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 130.0,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car Brand Test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car Brand Test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 130.0,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car Brand Test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car3' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 130.0,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car Brand Test',
      category_id: '123',
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: '123' });

    expect(cars).toEqual([car]);
  });
});
