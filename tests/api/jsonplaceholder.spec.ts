import { test, expect } from '@playwright/test';

test.describe('API Automation Scenarios', () => {

    // CRUD: POST
    test('API_01: Create Resource (POST)', async ({ request }) => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: { title: 'QA Test', body: 'Automation', userId: 1 }
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.id).toBeTruthy();
    });

    // CRUD: GET
    test('API_02: Read Resource (GET)', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBe(1);
    });

    // CRUD: PATCH (Partially Update)
    test('API_03: Partial Update (PATCH)', async ({ request }) => {
        const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
            data: { title: 'UPDATED TITLE ONLY' }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.title).toBe('UPDATED TITLE ONLY');
        expect(body.body).toBeTruthy(); 
    });

    // CRUD: DELETE
    test('API_04: Delete Resource', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
        // JSONPlaceholder returns 200 for successful simulated deletion
        expect(response.status()).toBe(200);
    });

    // NEGATIVE: GET Non-Existent ID
    test('API_05: Negative Get (404)', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');
        expect(response.status()).toBe(404);
    });

    // EDGE: Invalid Payload Types
    test('API_06: Edge Case (Invalid Payload)', async ({ request }) => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: { 
                title: 12345, 
                body: true, 
                userId: 'invalid_string' 
            }
        });
        
        // Asserting that the API handles invalid types gracefully without a 500 Internal Server Error
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.id).toBeDefined(); 
    });
});