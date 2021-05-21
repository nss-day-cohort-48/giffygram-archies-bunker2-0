import { PostList } from "./feed/PostList.js";
import { PostEntry } from "./feed/PostsEntry.js";
import { Footer } from "./nav/Footer.js";
import { NavBar } from "./nav/NavBar.js";

export const GiffyGram = () => {
  // Show main main UI
  return `
    ${NavBar()}
    ${PostEntry()}
    ${PostList()}
    ${Footer()}
    `;
};
