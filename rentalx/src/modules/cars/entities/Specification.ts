import { randomUUID } from 'node:crypto';

class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    this.id ? this.id : (this.id = randomUUID());
  }
}

export { Specification };
