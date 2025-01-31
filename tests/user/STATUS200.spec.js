// @ts-check
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const CT01 = require('./resources_schemas/CT01.schema.json')
const CT02 = require('./resources_schemas/CT02.schema.json')
const ajv = new Ajv();

const Id_list = [1, 2, 5, 8];
const valuesOfLimit = [1, 2, 5, 6, 7 ];

test('CT01 - get all User', async ({ request }) => {

  const response = await request.get('/users');
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(await ajv.validate(CT01, body)).toBeTruthy();

});


for (let id of Id_list) {
  test(`CT02 - get User by ID ${id}`, async ({ request }) => {

    const response = await request.get(`/users/${id}`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(id);
    expect(await ajv.validate(CT02, body)).toBeTruthy();
  })
}

for (let value of valuesOfLimit) {
test(`CT03 - Validate limit for page  - value of limit ${value}`, async ({ request }) => {
  
  const response = await request.get(`/users?limit=${value}`);
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.length).toBeLessThanOrEqual(value);
  expect(await ajv.validate(CT01, body)).toBeTruthy();
})

}

