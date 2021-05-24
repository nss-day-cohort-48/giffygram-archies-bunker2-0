import { getMessages, getUsers, messageIsRead, messageIsUnread } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("change", changeEvent => {

    let messages = getMessages();
    if(changeEvent.target.id.startsWith("readCheckbox")) {
       const [, messageId] = changeEvent.target.id.split("--")
       const messageIdInt = parseInt(messageId)
       for (const message of messages) {
           if(message.id === messageIdInt) {
               if(message.read === false) {
                  messageIsRead(messageIdInt)
               } 
               else if(message.read === true) {
                  messageIsUnread(messageIdInt)
               }
           }
       }
    }
})

export const MessageList = () => {
  const messages = getMessages();
  const users = getUsers();
  const currentUserId = parseInt(localStorage.getItem("gg_user"))


  let readMessages = messages.filter(message => message.read === true)
  let unReadMessages = messages.filter(message => message.read === false)


  let html = `<div class="messages">
               <div class="messageList">
               <h3 class="unReadMessagesHeader">Unread Messages</h3>
               ${unReadMessages.map((message) => {
                   if(currentUserId === message.recipientId) 

                 return `
                        <div class="message" id="message--${message.id}">
                            <div class="message__author">From ${
                              users.find(
                                (user) => user.id === message.userId
                              ).name
                            }</div>
                            <div class="message__text">${message.text}</div>
                            <input type="checkbox" id="readCheckbox--${message.id}"> Read</input>
                        </div>
                        
                   `;
               }).join("")}
               </div>

               <div class="messageList">
               <h3 class="readMessagesHeader">Read Messages</h3>
               ${readMessages.map((message) => {
                   if(currentUserId === message.recipientId) 

                 return `
                        <div class="message" id="message--${message.id}">
                            <div class="message__author">From ${
                              users.find(
                                (user) => user.id === message.userId
                              ).name
                            }</div>
                            <div class="message__text">${message.text}</div>
                            <input type="checkbox" id="readCheckbox--${message.id}" checked="checked"> Read</input>
                        </div>
                        
                   `;
               }).join("")}
               </div>
               </div>
    `;
  return html;
};
