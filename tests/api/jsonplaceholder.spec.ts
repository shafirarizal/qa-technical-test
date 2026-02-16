import { test, expect } from '@playwright/test';

test.describe('API Automation - JSONPlaceholder', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    const targetPostId = 1; 

    test('CRUD Operations Flow', async ({ request }) => {
        // 1. CREATE
        const createResponse = await request.post(baseUrl, {
            data: { title: 'foo', body: 'bar', userId: 1 },
        });
        expect(createResponse.ok()).toBeTruthy();
        const createBody = await createResponse.json();
        expect(createBody).toMatchObject({ title: 'foo', body: 'bar' });

        // 2. READ
        const getResponse = await request.get(`${baseUrl}/${targetPostId}`);
        expect(getResponse.ok()).toBeTruthy();
        const getBody = await getResponse.json();
        expect(getBody.id).toBe(targetPostId);

        // 3. UPDATE
        const updateResponse = await request.put(`${baseUrl}/${targetPostId}`, {
            data: { id: targetPostId, title: 'updated title', body: 'bar', userId: 1 },
        });
        expect(updateResponse.ok()).toBeTruthy();
        const updateBody = await updateResponse.json();
        
        // 4. VERIFY UPDATE
        expect(updateBody.title).toBe('updated title'); 

        // 5. DELETE
        const deleteResponse = await request.delete(`${baseUrl}/${targetPostId}`);
        expect(deleteResponse.ok()).toBeTruthy();
    });
});