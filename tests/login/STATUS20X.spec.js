import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const CT01 = require('./resources_schemas/CT01.schema.json')
const ajv = new Ajv();

test.only('POST - CT01  - get Token with Suscess', async ({ request }) => {

    const payloadRequest = JSON.stringify({
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    })
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const response = await request.post('https://fakestoreapi.com/auth/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: payloadRequest
    });
    const body = await response.json();
    
    expect(response.status()).toBe(200);
    expect(await ajv.validate(CT01, body)).toBeTruthy();
});

