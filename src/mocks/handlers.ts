import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api", async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({
      data: { ok: true },
    });
  }),
  http.get("/resource", ({ request }) => {
    return HttpResponse.json({
      data: {
        // formTitle: {
        //   title: "test",
        //   desc: "ttt",
        // },
        // option1: {
        //   type: "1",
        //   title: "test",
        //   options: {
        //     userOption1: "ttttt",
        //     userOption2: "tttt",
        //   },
        //   required: true,
        // },
        "hello"
      },
    });
  }),
];
