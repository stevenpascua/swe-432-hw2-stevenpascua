const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

const flushPromises = () => new Promise(setImmediate);
describe("GET /educationActivites ", () => {
  test("It should respond with a json activity with type education", async () => {
    const response = await request(app).get("/cities");
    expect(response.body).toEqual(["Fairfax", "Vienna", "Falls Church", "Arlington"]);
    expect(response.statusCode).toBe(200);
  });
});

