import { getMessages, getUsers } from "../data/provider.js";

export const MessageList = () => {
  const messages = getMessages();
  const users = getUsers();
  const currentUserId = parseInt(localStorage.getItem("gg_user"))

  let html = `<div class="messages"></div>
               <div class="messageList">
               ${messages.map((message) => {
                   if(currentUserId === message.recipientId)
                 return `
                        <div class="message" id="message--${message.id}">
                            <div class="message__author">From ${
                              users.find(
                                (user) => user.id === message.recipientId
                              ).name
                            }</div>
                            <div class="message__text">${message.text}</div>
                        </div>
                   `;
               }).join("")}
               </div>
    `;
  return html;
};
