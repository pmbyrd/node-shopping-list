process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");
// Have a beforeEach that resets the items to the original items
//have a test item to work with in the database
let testItem = { name: "test", price: 100 };

beforeEach(function () {
  items.push(testItem);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("Get all items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [testItem] });
  });
});

describe("POST /items", function () {
    test("Create a new item", async function () {
        const resp = await request(app)
            .post("/items")
            .send({ name: "test2", price: 200 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ added: { name: "test2", price: 200 } });
    });
    test("Respond with 400 if name or price is missing", async function () {
        const resp = await request(app)
            .post("/items")
            .send({ name: "test3" });
        expect(resp.statusCode).toBe(400);
    });
});

describe("GET /items/:name", function () {
    test("Get a single item", async function () {
        const resp = await request(app).get(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: testItem });
    });
    test("Respond with 404 if name is incorrect missing", async function () {
        const resp = await request(app).get(`/items/badTest`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", function () {
    test("Update a single item", async function () {
        const resp = await request(app)
            .patch(`/items/${testItem.name}`)
            .send({ name: "test4", price: 400 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ updated: { name: "test4", price: 400 } });
    });
    test("Respond with 404 if name is incorrect missing", async function () {
        const resp = await request(app)
            .patch(`/items/badTest`)
            .send({ name: "test4", price: 400 });
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Delete a single item", async function () {
        const resp = await request(app)
            .delete(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
    test("Respond with 404 if name is incorrect missing", async function () {
        const resp = await request(app)
            .delete(`/items/badTest`);
        expect(resp.statusCode).toBe(404);
    });
});