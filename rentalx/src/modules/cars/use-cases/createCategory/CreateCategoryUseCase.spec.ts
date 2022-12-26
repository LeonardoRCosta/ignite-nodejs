import { AppError } from '@shared/errors/AppError';
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'TestCategory',
      description: 'TestCategory description',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const createdCategory = await inMemoryCategoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create a category that already exists', async () => {
    expect(async () => {
      const category = {
        name: 'TestCategory',
        description: 'TestCategory description',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
