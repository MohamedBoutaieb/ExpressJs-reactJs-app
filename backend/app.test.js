const request = require("supertest");
const app = require("./app");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const response = await request(app).get("/users?page=1");
    expect(response.status).toBe(200);
  });
});
it("should return a specific user by ID", async () => {
    const userId = 1;
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(userId);
});