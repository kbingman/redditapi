import fetch from "isomorphic-unfetch";
import {
  chainFrom,
  compose,
  filter,
  flatMap,
  map,
  take,
  toArray,
  transduce,
} from "transducist";
import { Listing, Post } from "./types";
import {
  getNonEmptyStrings,
  removeTitles,
  sanitizeString,
  splitLines,
  trimWhiteSpace,
} from "./utils";

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

const getPostBody = ({ data }: Post) => {
  return [
    data.body,
    ...(data?.replies?.data?.children || []).map(({ data }: Post) => data.body),
  ];
};

const inspect = <T>(item: T): T => {
  console.log(item);
  return item;
};

async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

async function main() {
  const listings = await fetchListings(URL);
  const children = listings[1]?.data.children;

  console.time("process");
  const names = chainFrom(children)
    .map(getPostBody)
    .flatten()
    .map(inspect)
    .flatMap(splitLines)
    .map(sanitizeString)
    .map(removeTitles)
    .filter(getNonEmptyStrings)
    .map(trimWhiteSpace)
    .toArray();

  // const names = transduce(
  //   children,
  //   compose(
  //     map(getPostBody),
  //     flatMap(splitLines),
  //     // map(inspect),
  //     map(sanitizeString),
  //     map(removeTitles),
  //     filter(getNonEmptyStrings),
  //     map(trimWhiteSpace)
  //     // take(4)
  //   ),
  //   toArray()
  // );

  console.timeEnd("process");
  console.log(names);
}

main();

