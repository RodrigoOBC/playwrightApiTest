import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();

test('POST - CT02  - get Token without Password', async ({ request }) => {
    
    const payloadRequest = JSON.stringify({
        username: "mor_2314",
        password: ""
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
    const body = await response.text();
    
    expect(response.status()).toBe(400);
    expect(body).toBe("username and password are not provided in JSON format")
})

test('POST - CT03  - get Token without UserName', async ({ request }) => {
    
    const payloadRequest = JSON.stringify({
        username: "",
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
    const body = await response.text();
    
    expect(response.status()).toBe(400);
    expect(body).toBe("username and password are not provided in JSON format")
})

test('POST - CT04  - get Token without UserName and Password', async ({ request }) => {

    const payloadRequest = JSON.stringify({
        username: "",
        password: ""
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
    const body = await response.text();
    
    expect(response.status()).toBe(400);
    expect(body).toBe("username and password are not provided in JSON format")
})

test('POST - CT05  - get Token with invalide credential ', async ({ request }) => {

    const payloadRequest = JSON.stringify({
        username: "teste",
        password: "teste"
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
    const body = await response.text();
    
    expect(response.status()).toBe(401);
    expect(body).toBe("username or password is incorrect")
})
