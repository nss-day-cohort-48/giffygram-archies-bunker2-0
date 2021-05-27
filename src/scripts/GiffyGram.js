import { NavBar } from "./nav/NavBar.js";
import { MessageForm } from "./message/MessageForm.js";
import { PostList } from "./feed/PostList.js";
import { PostEntry } from "./feed/PostsEntry.js";
import { Footer } from "./nav/Footer.js";
import { MessageList } from "./friends/MessageList.js";
import { getDisplayFavorites, getDisplayProfile, getInboxDisplay } from "./data/provider.js";
import { FavoriteList } from "./feed/FavoriteList.js";
import { Profile } from "./feed/Profile.js";

export const GiffyGram = () => {
  let inboxDisplay = getInboxDisplay();
  let favoritesDisplay = getDisplayFavorites()
  let profileDisplay = getDisplayProfile()
  // Show main main UI
  //shows the posts list
  if (inboxDisplay === false && favoritesDisplay === false && profileDisplay === false) {
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
  //show favorites list
  else if (inboxDisplay === false && favoritesDisplay === true && profileDisplay === false) {
    return `
      ${NavBar()}
      ${MessageForm()}
      <div class="giffygram__feed">
      ${PostEntry()}
      ${FavoriteList()}
      </div>
      ${Footer()}
    `;
    //shows the profile
  } else if (inboxDisplay === false && favoritesDisplay === false && profileDisplay === true) {
    return `
      ${NavBar()}
      ${MessageForm()}
      <div class="giffygram__feed">
      ${Profile()}
      </div>
      ${Footer()}
    `
    //shows the message inbox
  } else {
    return `
      ${NavBar()}
      ${MessageForm()}
      ${MessageList()}
      ${Footer()}
      `;
  }
};
