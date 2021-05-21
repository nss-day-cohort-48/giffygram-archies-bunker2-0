import { getMessages, getUsers } from "../data/provider.js";

export const MessageList = () => {
  const messages = getMessages();
  const users = getUsers();
  const currentUserId = parseInt(localStorage.getItem("gg_user"))

  const applicationElement = document.querySelector(".giffygram");

  applicationElement.addEventListener("click", clickEvent => {
      if(clickEvent.target.id.startsWith("readButton")) {
         const [, messageId] = clickEvent.target.id.split("--")
         for (const message of messages) {
            if(messageId === message.id) {
                message.read = true
            }
         }
         
      }
  })

  let html = `<div class="messages"></div>
               <div class="messageList">
               ${messages.map((message) => {
                   if(currentUserId === message.recipientId)
                 return `
                        <div class="message" id="message--${message.id}">
                            <div class="message__author">From ${
                              users.find(
                                (user) => user.id === message.userId
                              ).name
                            }</div>
                            <div class="message__text">${message.text}</div>
                            <button id="readButton--${message.id}">Read</button>
                        </div>
                        
                   `;
               }).join("")}
               </div>
    `;
  return html;
};
