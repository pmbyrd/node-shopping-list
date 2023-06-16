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
// describe("GET /items/:name", function () {
//   test("Get a single item", async function () {
//     const resp = await request(app).get(`/items/${testItem.name}`);
//     expect(resp.statusCode).toBe(200);
//     expect(resp.body).toEqual({ item: testItem });
//   });
// });
