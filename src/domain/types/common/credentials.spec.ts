import { Credentials } from "./credentials";
describe("Credentials without token.", () => {
  it("should be defined", () => {
    const credentials: Credentials = {
      username: "username",
      password: "password",
    };
    expect(credentials).toBeDefined();
  });

  it("should be defined with all fields.", () => {
    const credentials: Credentials = {
      username: "username",
      password: "password",
      token: "token",
    };
    expect(credentials).toBeDefined();
  });

  it('can be empty object.', () => {
    const credentials: Credentials = {};
    expect(credentials).toBeDefined();
  });
});
