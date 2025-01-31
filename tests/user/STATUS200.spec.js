// @ts-check
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const CT01 = require('./resources_schemas/CT01.schema.json')
const CT02 = require('./resources_schemas/CT02.schema.json')
const ajv = new Ajv();

const Id_list = [1, 2, 5, 8];
const valuesOfLimit = [1, 2, 5, 6, 7];

test('CT01 - GET - get all User', async ({ request }) => {

  const response = await request.get('/users');
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(await ajv.validate(CT01, body)).toBeTruthy();

});


for (let id of Id_list) {
  test(`CT02 - GET - get User by ID ${id}`, async ({ request }) => {

    const response = await request.get(`/users/${id}`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(id);
    expect(await ajv.validate(CT02, body)).toBeTruthy();
  })
}

for (let value of valuesOfLimit) {
  test(`CT03 - GET - Validate limit for page  - value of limit ${value}`, async ({ request }) => {

    const response = await request.get(`/users?limit=${value}`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.length).toBeLessThanOrEqual(value);
    expect(await ajv.validate(CT01, body)).toBeTruthy();
  })

}


test(`CT04 - POST - Create User`, async ({ request }) => {
  let payloadRequest = {
    email: 'John@gmail.com',
    username: 'johnd',
    password: 'm38rmF$',
    name: {
      firstname: 'John',
      lastname: 'Doe'
    },
    address: {
      city: 'kilcoole',
      street: '7835 new road',
      number: 3,
      zipcode: '12926-3874',
      geolocation: {
        lat: '-37.3159',
        long: '81.1496'
      }
    },
    phone: '1-570-236-7033'
  }

  let payload = JSON.stringify(payloadRequest);
  const response = await request.post('/users', { data: payload });

  expect(response.status()).toBe(200);

})


test(`CT05 - PUT - Update number User`, async ({ request }) => {
  let payloadRequest = {
    email: 'John@gmail.com',
    username: 'johnd',
    password: 'm38rmF$',
    name: {
      firstname: 'John',
      lastname: 'Doe'
    },
    address: {
      city: 'kilcoole',
      street: '7835 new road',
      number: 3,
      zipcode: '12926-3874',
      geolocation: {
        lat: '-37.3159',
        long: '81.1496'
      }
    },
    phone: '1-370-236-7038'
  }

  let payload = JSON.stringify(payloadRequest);
  const response = await request.patch('/users/7', { data: payload });
  const body = await response.json();


  expect(response.status()).toBe(200);
  expect(body.email).toBe(payloadRequest.email);
  expect(body.phone).toBe(payloadRequest.phone);



})