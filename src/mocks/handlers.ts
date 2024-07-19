import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api", async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({
      data: { ok: true },
    });
  }),
  http.get("/resource", ({ request }) => {
    return HttpResponse.text("hello");
  }),
];
