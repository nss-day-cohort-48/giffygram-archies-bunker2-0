import { getLikes, getPosts } from "../data/provider.js";

export const PostList = () => {
  const posts = getPosts();
  const likes = getLikes();
  let html = "";
};
