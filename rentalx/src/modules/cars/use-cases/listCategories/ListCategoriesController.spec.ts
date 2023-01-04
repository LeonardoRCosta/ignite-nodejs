import request from 'supertest';
import { Connection } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { hash } from 'bcrypt';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

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

  it('should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com.br', password: 'admin' });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({ name: 'Category Supertest', description: 'Category Supertest' })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category Supertest');
  });
});