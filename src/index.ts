import fetch from "isomorphic-unfetch";
import { Listing, Post } from "./types";

const URL = `https://www.reddit.com/r/TheCulture/comments/megvqx/which_culture_ship_name_would_best_replace_the.json`;

export const getBody = (item: Post) => item.data.body;
export const splitPost = (item: string) => item.split("\n");
export const getNonEmptyStrings = (item: string) => item !== "";
export const sanitizeString = (item: string) => item.replace(/_|\*/g, "");

export async function fetchListings(url: string): Promise<Listing[]> {
  const response = await fetch(url);
  return response.json();
}

export async function fetchRedditApi() {
  const listings = await fetchListings(URL);
  // return formatListings(getChildren(listings));
  const composeFunction = ourOwnCompose(
    loggerFunc,
    formatListings,
    getChildren,
    loggerFunc
  );
  return composeFunction(listings);
}

//This is also sort of a pipe
export function formatListings(posts: Post[]) {
  return posts
    .map(getBody)
    .map(splitPost)
    .flat()
    .filter(getNonEmptyStrings)
    .map(sanitizeString);
}

export const getChildren = (listing: Listing[]) => listing[1]?.data.children;

//This func doesn't mean to do anything it's a test to pass our parameters.
export const identityFunc = <T>(arg: T): T => arg;

export const loggerFunc = <T>(arg: T): T => {
  console.log(arg);
  return arg;
};

//This is not a compose func because it goes right to the left.
export const ourOwnCompose =
  (...fns: Function[]) =>
  (arg: any) => {
    return fns.reduceRight((acc, fn) => {
      return fn(acc);
    }, arg);
  };

//This is not a compose func because it goes left to right.
export const ourOwnPipe =
  (...fns: any[]) =>
  (arg: any) => {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, arg);
  };

//Typing away with generics
export const ourOwnPipeWithTwoArgs =
<T>(...fns:[fn1: (arg: T) => T , fn2: (arg:T) => T]) =>
(arg: T) => {
  return fns.reduce((acc, fn) => {
    return fn(acc);
  }, arg);
};

//Attempt with different parameters
// export const ourOwnPipeWithTwoArgs =
// <T, U>(...fns:[fn1: (arg: T) => U , fn2: (arg:U) => U]) =>
// (arg: T) => {
//   return fns.reduce((acc, fn) => {
//     return fn(acc);
//   }, arg: T);
// };

const toUpperCase = (s: string) => s.toUpperCase();
const yell = (s: string) => s+'!!!'
const add1 = (n: number) => n + 1;
const multiply2 = (n: number) => n * 2;

//Wont work with same type for args and return value. 
const toString = (n: number) => n.toString();

console.log(ourOwnPipeWithTwoArgs(toUpperCase, yell)('hola'))

// main();
