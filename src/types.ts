export type Listing = {
  kind: "t1" | "t3";
  data: {
    children: Post[];
  };
};

export type Post = {
  kind: "t1" | "t3";
  data: {
    body: string;
    permalink: string;
  };
};

