import fetch from 'isomorphic-unfetch';
import {Listing, Post} from './types';

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

export const getBody = (item: Post) => item.data.body;
export const splitPost = (item: string) => item.split('\n');
export const getNonEmptyStrings = (item: string) => item !== '';
export const sanitizeString = (item: string) => item.replace(/_|\*/g, '');

export async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

export async function fetchRedditApi() {
  const listings = await fetchListings(URL);
  return formatListings(listings[1]?.data.children);
}

export function formatListings(posts: Post[]) {
  return posts
    .map(getBody)
    .map(splitPost)
    .flat()
    .filter(getNonEmptyStrings)
    .map(sanitizeString);
}

// main();
