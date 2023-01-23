process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let popsicle = { name: 'popsicle', price: 1.45 };

beforeEach( () => {
    items.push(popsicle);
});

afterEach( () => {
    items.length = 0;
})

describe("GET /items", () => {
    test("GET list of items", async () => {
      const res = await request(app).get("/items");
      const { items } = res.body;
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toEqual({ name: "popsicle", price: 1.45 });
    });
});


describe('GET /items/:name', () => {
    test('Get a single item', async () => {
        const res = await request(app).get(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: popsicle });
    });

    test ('Responds with 404 if cannot find item', async () => {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});


describe('POST /items', () => {
    test('Creates a new item', async () => {
      const res = await request(app)
        .post(`/items`)
        .send({
          name: 'soda', price: 1.99
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.added).toEqual({ name: 'soda', price: 1.99 });
      expect(items.length).toEqual(2);
    });
});


describe("PATCH /items/:name", function () {
    test("Update a single item", async () => {
      const res = await request(app)
        .patch("/items/popsicle")
        .send({ name: "pushup", price: 1.99 });
      expect(res.statusCode).toBe(200);
      expect(items[0]).toEqual({ name: "pushup", price: 1.99 });
    });
  });


describe('DELETE /items/:name', () => {
    test('Delete a single item', async () => {
        const res = await request(app).delete(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' });
    });
});