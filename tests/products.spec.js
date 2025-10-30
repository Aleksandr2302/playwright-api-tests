import { test, expect } from '@playwright/test';
import * as apiClient from '../helpers/apiClient';

// Test#1
test('GET all products', async ({ request }) => {
  const response = await apiClient.getProducts(request);
  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(Array.isArray(products)).toBeTruthy();
  expect(products.length).toBeGreaterThan(0);
});

// Test#2
test('GET single product by id', async ({ request }) => {
  const id = 1;
  const response = await apiClient.getSingleProductById(request, id);
  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(typeof product).toBe('object');
  expect(product.id).toBe(String(id));
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('data');
});

// Test#3
test('GET list of product by id', async ({ request }) => {
  const id = [1, 2, 3];
  const response = await apiClient.getListOfProductById(request, id[0], id[1], id[2]);
  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(products).toHaveLength(3);
  const actualIds = products.map((p) => Number(p.id));
  expect(actualIds).toEqual(id);
});

// Test#4
test('Add a new product', async ({ request }) => {
  const object = {
    name: 'Apple MacBook Pro 16',
    data: {
      year: 2019,
      price: 1849.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB',
    },
  };
  const response = await apiClient.addProduct(request, object);
  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(product.name).toBe('Apple MacBook Pro 16');
  expect(product.data.year).toBe(2019);
  expect(product.data['CPU model']).toBe('Intel Core i9');
  expect(product.data['Hard disk size']).toBe('1 TB');
  expect(product.createdAt).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/,
  );
});

// Test#5
test('Update all product by Id', async ({ request }) => {
  // Create object
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 15',
      data: {
        year: 2023,
        price: 1500,
      },
    },
  });

  expect(createResponse.status()).toBe(200);
  const created = await createResponse.json();
  const id = created.id; // <-- получаем id созданного объекта

  // 2. Update product by id
  const object = {
    name: 'Apple MacBook Pro 17',
    data: {
      year: 2025,
      price: 2000,
      'CPU model': 'Intel Core i10',
      'Hard disk size': '2 TB',
    },
  };

  const updateResponse = await apiClient.updateAllProductById(request, id, object);
  expect(updateResponse.status()).toBe(200);
  const product = await updateResponse.json();
  expect(product.name).toBe('Apple MacBook Pro 17');
  expect(product.data.year).toBe(2025);
  expect(product.data['CPU model']).toBe('Intel Core i10');
  expect(product.data['Hard disk size']).toBe('2 TB');
  expect(product.updatedAt).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/,
  );
});

// Test#6
test('Update some fields of product by Id', async ({ request }) => {
  // Create object
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 17',
      data: {
        year: 2024,
        price: 2500,
      },
    },
  });

  expect(createResponse.status()).toBe(200);
  const created = await createResponse.json();
  const id = created.id; // <-- получаем id созданного объекта

  // 2. Update product by id
  const object = {
    name: 'Apple MacBook Pro 19',
  };

  const updateResponse = await apiClient.updateSomePartOfProductById(request, id, object);
  expect(updateResponse.status()).toBe(200);
  const product = await updateResponse.json();
  expect(product.name).toBe('Apple MacBook Pro 19');
  expect(product.data.year).toBe(2024);
  expect(product.data.price).toBe(2500);
  expect(product.updatedAt).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|[\+\-]\d{2}:\d{2})$/,
  );
});

// Test#7
test('Delete product by Id', async ({ request }) => {
  // Create object
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 18',
      data: {
        year: 2024,
        price: 2500,
      },
    },
  });
  expect(createResponse.status()).toBe(200);
  const created = await createResponse.json();
  const id = created.id; // <-- получаем id созданного объекта

  const deleteResponse = await apiClient.deleteProductById(request, id);
  expect(deleteResponse.status()).toBe(200);
  // Get product after deletion
  const deleteProduct = await apiClient.getSingleProductById(request, id);
  expect(deleteProduct.status()).toBe(404);
});
