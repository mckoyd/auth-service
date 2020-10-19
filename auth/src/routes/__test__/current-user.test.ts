import request from "supertest";
import app from "../../app";

it("should return the current user when logged in", async () => {
  const cookie = await global.signin("test@email.com", "test123");

  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@email.com");
});

it("should return a null current user when not logged in", async () => {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
