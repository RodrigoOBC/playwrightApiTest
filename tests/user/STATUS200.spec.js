// @ts-check
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
const CT01 = require('./resources_schemas/CT01.schema.json')
const ajv = new Ajv();

test('CT01 - get all User', async ({ request }) => {
  
  const response = await request.get('/users');
  const body = await response.json();
  
  expect(response.status()).toBe(200);
  expect(await ajv.validate(CT01, body)).toBeTruthy();

});

test('CT02 - get User by ID', async ({ request }) => {

  const response = await request.get('/users/1');
  const body = await response.json();
  
  expect(response.status()).toBe(200);
  expect(body.id).toBe(1);
  
})