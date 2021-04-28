import {fetchRedditApi, sanitizeString, formatListings} from './index';

describe('reddit api', () => {
  test('it works', async () => {
    // const listings = await fetchRedditApi();
    // console.log(listings);
    // expect(true).toBe(true);
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

// body: 'GCU *Pure Big Mad Boat Man*'
