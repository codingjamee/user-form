import { http } from "msw";

export const handlers = [
  // Handles a POST /login request
  http.post("/login", () => {}),

  // Handles a GET /user request
  http.get("/user", () => {}),
];
