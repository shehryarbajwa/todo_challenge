const supertest = require("supertest");
const app = require("../app");

app = supertest(app);

let token;

beforeAll(done => {
  request(app)
    .post("/login")
    .send({
      username: user,
      password: password
    })
    .end((error, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe("GET /", () => {
  // token not being sent - should respond with a 401
  test("It should require authorization", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
  // send the token - should respond with a 200
  test("It responds with JSON", () => {
    return request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
      });
  });
});
