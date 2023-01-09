import { hash } from 'bcrypt';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

describe('Create Category Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = randomUUID();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
      VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com.br', password: 'admin' });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({ name: 'Category Supertest', description: 'Category Supertest' })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a category that already exists', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com.br', password: 'admin' });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({ name: 'Category Supertest', description: 'Category Supertest' })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(400);
  });
});
