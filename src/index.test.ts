import { fetchRedditApi, sanitizeString, formatListings, ourOwnPipeWithTwoArgs } from "./index";

describe("reddit api", () => {
  test.only("it works", async () => {
    const listings = await fetchRedditApi();
    expect(true).toBe(true);
  });
});

describe("sanitize string", () => {
  test("filter stars", () => {
    const result = sanitizeString("whatever* we want");
    expect(result).toBe("whatever we want");
  });
  test("filter underscores", () => {
    const result = sanitizeString("whatever_ we want");
    expect(result).toBe("whatever we want");
  });
});

describe("format listings", () => {
  test("formats data with stars", () => {
    const result = formatListings([
      {
        kind: "t1",
        data: {
          body: "GCU *Pure Big Mad Boat Man*",
          permalink: "https://example.com",
        },
      },
    ]);
    expect(result).toEqual(["GCU Pure Big Mad Boat Man"]);
  });
});

describe('our own pipe with two fns', () => {
  const add1 = (n: number) => n + 1;
  const multiply2 = (n: number) => n * 2;
  test.only('bla bla', () => {
    const results = ourOwnPipeWithTwoArgs(add1, multiply2);
    console.log(results(222));
  });
});

// body: *Pure Big Mad Boat Man*'
