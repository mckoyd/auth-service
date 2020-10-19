import request from "supertest";
import app from "../../app";

it("fails when email doesn't exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "test123",
    })
    .expect(400);
});

it("fails when password supplied is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "test123",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "wrongPassword",
    })
    .expect(400);
});

it("responds with cookie when valid email and password supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
      password: "test123",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@email.com",
      password: "test123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
