import fetch from 'isomorphic-unfetch';
import { Listing, Post } from './types';

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

//This is a compose func because it goes right to the left.
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
  <T>(...fns: [fn1: (arg: T) => T, fn2: (arg: T) => T]) =>
  (arg: T) => {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, arg);
  };

/* COMPOSE */
// Typing generics with different types
// T, U, V are usually used as variables for generics
// The typing follows the order of Input, Midput, Output
export const composeWithTwoArgsDiffTypes =
  <Input, Midput, Output>(
    fn2: (arg: Midput) => Output,
    fn1: (arg: Input) => Midput
  ) =>
  (arg: Input): Output => {
    return fn2(fn1(arg));
  };

// this fn is the same as above
export function ourOwnComposeWithTwoArgsDiffTypes<Input, Midput, Output>(
  ...fns: [fn2: (arg: Midput) => Output, fn1: (arg: Input) => Midput]
) {
  return (arg: Input): Output => {
    return fns.reduceRight((acc: any, fn) => {
      return fn(acc);
    }, arg);
  };
}

/* COMPOSE FUNCTION OVERLOAD */
/* Overloads allows for multiple arguments with multiple typings in a compose or pipe function */

// overload declarations order does not matter
// overload declarations must be in the same file as the actual function
// overload declarations must have the same name as the actual function
// overload declarations must be prepend with `export`
// overload declarations must use `function` instead of the fat arrow `=>`
/*
  We will need one overload declarations for each situation so that Typescript knows what to expect.
  For example, if we only have an overload declaration for a situation with 3 arguments and
  not for the situation with 2 arguments, Typescript will complain that it expects 3 args when
  we only want to put 2 args in.
*/

// overload declaration for situation 1 with 2 arguments
export function ourOwnComposeOverload<Input, Midput, Output>(
  ...fns: [fn2: (arg: Midput) => Output, fn1: (arg: Input) => Midput]
): (arg: Input) => Output;

// overload declaration for situation 2 with 3 arguments
export function ourOwnComposeOverload<Input, Midput1, Midput2, Output>(
  ...fns: [
    fn3: (arg: Midput2) => Output,
    fn2: (arg: Midput1) => Midput2,
    fn1: (arg: Input) => Midput1
  ]
): (arg: Input) => Output;

// This is the actual function
// This is a compose func because it goes right to the left.
/*
  If we only write the overload declaration for situation 1 with 2 arguments, this fn is the same as the one above called ourOwnComposeWithTwoArgsDiffTypes
*/
// `...fns` is the same as `...args`, the name `fns` is made up
// `acc` can be `any` type because this allows for the type to change as our function progresses
// this is the proper way to use the `any` type
export function ourOwnComposeOverload<Input, Output>(...fns: Function[]) {
  return (arg: Input): Output => {
    return fns.reduceRight((acc: any, fn) => {
      return fn(acc);
    }, arg);
  };
}

// PIPE
//Typing away with generics with different types
// T, U, V for generics
export const ourOwnPipeWithTwoArgsDiffTypes =
  <Input, Midput, Output>(
    fn1: (arg: Input) => Midput,
    fn2: (arg: Midput) => Output
  ) =>
  (arg: Input): Output => {
    return fn2(fn1(arg));
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
const yell = (s: string) => s + '!!!';
const add1 = (n: number) => n + 1;
const multiply2 = (n: number) => n * 2;

//Wont work with same type for args and return value.
const toString = (n: number) => n.toString();

console.log(ourOwnPipeWithTwoArgs(toUpperCase, yell)('hola'));

// main();
