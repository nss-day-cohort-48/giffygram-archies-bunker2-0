import { NavBar } from "./nav/NavBar.js";
import { MessageForm } from "./message/MessageForm.js";
import { PostList } from "./feed/PostList.js";
import { PostEntry } from "./feed/PostsEntry.js";
import { Footer } from "./nav/Footer.js";
import { MessageList } from "./friends/MessageList.js"

export const GiffyGram = () => {
  // Show main main UI
  return `
    ${NavBar()}
    ${MessageForm()}
    ${MessageList()}
    <div class="giffygram__feed">
    ${PostEntry()}
    ${PostList()}
    </div>
    ${Footer()}
    `;
};
