import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { InMemoryMailProvider } from '@shared/container/providers/mailProvider/in-memory/InMemoryMailProvider';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send forgot password mail', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
  let dateProvider: DayjsDateProvider;
  let mailProvider: InMemoryMailProvider;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password email to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await inMemoryUsersRepository.create({
      driver_license: '237999',
      email: 'kiblusu@biwpu.rs',
      name: 'Eleanor Holmes',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('kiblusu@biwpu.rs');

    expect(sendMail).toBeCalled();
  });

  it('should not be able to send an email if user email is not registered', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('kawe@fgj.com')
    ).rejects.toEqual(new AppError('User not found', 404));
  });

  it('should be able to create an user token', async () => {
    const generateMailToken = jest.spyOn(
      inMemoryUsersTokensRepository,
      'create'
    );

    await inMemoryUsersRepository.create({
      driver_license: '333405',
      email: 'lapou@cfai.rs',
      name: 'Sherlock Holmes',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('lapou@cfai.rs');

    expect(generateMailToken).toBeCalled();
  });
});
