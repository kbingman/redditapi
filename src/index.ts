import fetch from "isomorphic-unfetch";
import { Listing, Post } from "./types";

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

async function main() {
  const listings = await fetchListings(URL);
  const children = listings[1]?.data.children;

  console.log(children);
}

main();

