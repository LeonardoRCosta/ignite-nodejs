import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
