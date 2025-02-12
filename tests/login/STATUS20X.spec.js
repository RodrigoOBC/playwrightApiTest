import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const CT01 = require('./resources_schemas/CT01.schema.json')
const CT02 = require('./resources_schemas/CT02.schema.json')
const ajv = new Ajv();

test('POST - CT01  - get Token with Suscess', async ({ request }) => {

    const payloadRequest = JSON.stringify({
        username: "mor_2314",
        password: "83r5^_"
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

