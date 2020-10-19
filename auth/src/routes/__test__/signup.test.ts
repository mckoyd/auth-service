import request from "supertest";
import app from "../../app";

it("returns 201 on successful post", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidEmail",
      password: "test123",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidEmail",
      password: "bad",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@email.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "test123",
    })
    .expect(400);

  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test123",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
