import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RentalReturnUseCase } from './RentalReturnUseCase';

class RentalReturnController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const rentalReturnUseCase = container.resolve(RentalReturnUseCase);

    const rental = await rentalReturnUseCase.execute({ id, user_id });

    return res.status(200).json(rental);
  }
}

export { RentalReturnController };
