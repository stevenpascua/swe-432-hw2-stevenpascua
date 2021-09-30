const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");
jest.setTimeout(15000)
describe("GET / ", () => {
  console.log("tests start");
  test("It should respond an activity of type education.", async () => {
	  await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).get("/educationActivites");
    expect(response.body.type).toEqual('education');
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with anyActivity service not available", async () => {
    const response = await request(app).get("/anyActivty");
    expect(response.statusCode).toBe(404);
  });

	test("It should respond an activity of type recreational.", async () => {
    const response = await request(app).get("/recreationalActivites");
    expect(response.body.type).toEqual('recreational');
    expect(response.statusCode).toBe(200);
  });
  test("It should respond an activity of type social.", async () => {
    const response = await request(app).get("/socialActivites");
    expect(response.body.type).toEqual('social');
    expect(response.statusCode).toBe(200);
  });
  test("It should respond an activity of type diy.", async () => {
    const response = await request(app).get("/diyActivites");
    expect(response.body.type).toEqual('diy');
    expect(response.statusCode).toBe(200);
  });  
  test("It should respond an activity of type charity.", async () => {
    const response = await request(app).get("/charityActivites");
    expect(response.body.type).toEqual('charity');
    expect(response.statusCode).toBe(200);
  });  
  test("It should respond an activity of type cooking.", async () => {
    const response = await request(app).get("/cookingActivites");
    expect(response.body.type).toEqual('cooking');
    expect(response.statusCode).toBe(200);
  });  
  test("It should respond an activity of type relaxation.", async () => {
    const response = await request(app).get("/relaxationActivites");
    expect(response.body.type).toEqual('relaxation');
    expect(response.statusCode).toBe(200);
  });  
  test("It should respond an activity of type busywork.", async () => {
    const response = await request(app).get("/busyworkActivites");
    expect(response.body.type).toEqual('busywork');
    expect(response.statusCode).toBe(200);
  });  
  test("It should respond an activity of type music.", async () => {
    const response = await request(app).get("/musicActivites");
    expect(response.body.type).toEqual('music');
    expect(response.statusCode).toBe(200);
  });
  test("It should respond with all activities. Need to make sure there is at least 100 (defined in app.js at \"maxActivities\"", async () => {
    const response = await request(app).get("/allActivites");
    expect(response.body.length).toEqual(100);
    expect(response.statusCode).toBe(200);
  });
  


 

});