import fetch from 'isomorphic-unfetch';
import {Listing, Post} from './types';

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

export const getBody = (item: Post) => item.data.body;
export async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

export async function fetchRedditApi() {
  const listings = await fetchListings(URL);
  const splitItems = listings[1]?.data.children
    .map(getBody)
    .map(item => item.split('\n'))
    .flat()
    .filter(item => item !== '')
    .map(item => item.replace(/_|\*/g, ''));

  return splitItems;
}

// main();
