import {fetchRedditApi} from './index';

describe('reddit api', () => {
  test('it works', async () => {
    const listings = await fetchRedditApi();
    console.log(listings);
    // expect(true).toBe(true);
  });
});
