import fetch from "isomorphic-unfetch";
import { Listing, Post } from "./types";

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

const getPostBody = ({ data }: Post) => data.body;

const getMultilinePosts = (acc: string[], value: string) => [
  ...acc,
  ...value.split("\n"),
];

const getNonEmptyStrings = (value: string) => value !== "";

const sanitizeString = (str: string) => str.replace(/\*/g, "");

const removeTitles = (str: string) => str.replace(/[\w|\s]+\:/, "");

const trimWhiteSpace = (str: string) => str.trim();

async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

async function main() {
  const listings = await fetchListings(URL);
  const children = listings[1]?.data.children;

  const names = children
    .map(getPostBody)
    .reduce(getMultilinePosts, [])
    .filter(getNonEmptyStrings)
    .map(sanitizeString)
    .map(removeTitles)
    .map(trimWhiteSpace);

  console.log(names);
}

main();

