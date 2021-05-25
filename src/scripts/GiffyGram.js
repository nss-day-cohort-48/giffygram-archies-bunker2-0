import { NavBar } from "./nav/NavBar.js";
import { MessageForm } from "./message/MessageForm.js";
import { PostList } from "./feed/PostList.js";
import { PostEntry } from "./feed/PostsEntry.js";
import { Footer } from "./nav/Footer.js";
import { MessageList } from "./friends/MessageList.js";
import { getDisplayFavorites, getInboxDisplay } from "./data/provider.js";
import { FavoriteList } from "./feed/FavoriteList.js";

export const GiffyGram = () => {
  let inboxDisplay = getInboxDisplay();
  let favoritesDisplay = getDisplayFavorites()
  // Show main main UI
  if (inboxDisplay === false && favoritesDisplay === false) {
    return `
    ${NavBar()}
    ${MessageForm()}
    <div class="giffygram__feed">
    ${PostEntry()}
    ${PostList()}
    </div>
    ${Footer()}
    `;
  } 
  else if (inboxDisplay === false && favoritesDisplay === true) {
    return `
    ${NavBar()}
    ${MessageForm()}
    <div class="giffygram__feed">
    ${PostEntry()}
    ${FavoriteList()}
    </div>
    ${Footer()}
    `;
  } else {
    return `
      ${NavBar()}
      ${MessageForm()}
      ${MessageList()}
      ${Footer()}
      `;
  }
};
