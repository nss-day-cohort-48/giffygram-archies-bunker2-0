import { getUsers, postMessage, getFeedDisplayMessages, setMessageDisplayToFalse } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram");



applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "directMessage__submit") {
        const messageRecipient = document.querySelector(".message__input").value
        const messageDescription = document.querySelector("input[name='message']").value

        const currentUserId = parseInt(localStorage.getItem("gg_user"))

        const messageToSendToAPI = {
            userId: currentUserId,
            recipientId: parseInt(messageRecipient),
            text: messageDescription,
            read: false
        }

        postMessage(messageToSendToAPI)
        setMessageDisplayToFalse()

    }
    else if (clickEvent.target.id === "directMessage__close") {
        setMessageDisplayToFalse()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    else if (clickEvent.target.id === "directMessage__cancel") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
    
})
 

export const MessageForm = () => {
    const users = getUsers()
    const displayMessage = getFeedDisplayMessages()

    if(displayMessage === true) {
    return `
    <div class="directMessage">
    <h3>Direct Message</h3>
    <div class="message__recipients">
        <label>Recipient:</label>
        <select name="directMessage__userSelect" class="message__input" id="recipients">
        <option value="">Choose a recipient...</option>
        ${users.map((user) => {
            return `
            <option class="user" value="${user.id}">${user.id}</option>
            `
        }).join("")}
        </select>
        </div>

        <div class="message__description">
        <label for="message">Message:</label>
        <input type="text" name="message" class="message__input" placeholder="Message to user"/>
        </div>

        <button id="directMessage__submit">Save</button>
        <button id="directMessage__cancel">Cancel</button>
        <button id="directMessage__close">x</button>
        </div>
    `
    } else {
        return ""
    }
}