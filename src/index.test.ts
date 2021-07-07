import {
  fetchRedditApi,
  sanitizeString,
  formatListings,
  ourOwnPipeWithTwoArgs,
  ourOwnComposeWithTwoArgsDiffTypes,
  ourOwnComposeOverload,
} from './index';

describe('reddit api', () => {
  test('it works', async () => {
    const listings = await fetchRedditApi();
    expect(true).toBe(true);
  });
});

describe('sanitize string', () => {
  test('filter stars', () => {
    const result = sanitizeString('whatever* we want');
    expect(result).toBe('whatever we want');
  });
  test('filter underscores', () => {
    const result = sanitizeString('whatever_ we want');
    expect(result).toBe('whatever we want');
  });
});

describe('format listings', () => {
  test('formats data with stars', () => {
    const result = formatListings([
      {
        kind: 't1',
        data: {
          body: 'GCU *Pure Big Mad Boat Man*',
          permalink: 'https://example.com',
        },
      },
    ]);
    expect(result).toEqual(['GCU Pure Big Mad Boat Man']);
  });
});

describe('our own pipe with two fns', () => {
  const add1 = (n: number) => n + 1;
  const multiply2 = (n: number) => n * 2;
  test('bla bla', () => {
    const results = ourOwnPipeWithTwoArgs(add1, multiply2);
    console.log(results(222));
  });
});

// body: *Pure Big Mad Boat Man*'

describe('our Own Compose With Two Args Diff Types', () => {
  const add1 = (n: number) => n + 1;
  const multiply2 = (n: number) => n * 2;
  const sayHola = (n: number): string => n + 'Hola';
  const yell = (s: string) => s + '!!!';

  test('compose two fns', () => {
    const addAndMultiply = ourOwnComposeWithTwoArgsDiffTypes(yell, sayHola);

    console.log(addAndMultiply(42));
  });
});

describe('our Own Compose Overload With Multiple Args Diff Types', () => {
  const add1 = (n: number) => n + 1;
  const multiply2 = (n: number) => n * 2;
  const sayHola = (n: number): string => n + 'Hola';
  const yell = (s: string) => s + '!!!';

  test.only('compose multi fns', () => {
    const addAndMultiply = ourOwnComposeOverload(yell, sayHola);

    console.log(addAndMultiply(42));
  });
});
