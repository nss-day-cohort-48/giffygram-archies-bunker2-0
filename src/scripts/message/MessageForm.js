import { getUsers, postMessage, getFeedDisplayMessages } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "saveMessageButton") {
        const messageRecipient = document.querySelector(".message__recipients").value
        const messageDescription = document.querySelector("input[name='description']").value

        const currentUserId = parseInt(localStorage.getItem("gg_user"))

        const messageToSendToAPI = {
            userId: currentUserId,
            recipientId: messageRecipient,
            text: messageDescription,
            read: false
        }

        postMessage(messageToSendToAPI)
    }
})
 

export const MessageForm = () => {
    const users = getUsers()
    const displayMessage = getFeedDisplayMessages()

    if(displayMessage === true) {
    return `
    <section class="navigation__message">
    <div class="message__recipients">
        <label>Recipient:</label>
        <select class="recipients" id="recipients">
        <option value="">Choose a recipient...</option>
        ${users.map((user) => {
            return `
            <option class="user" value="${user.id}">${user.id}</option>
            `
        }).join("")}
        </select>
        </div>

        <div class="message__description">
        <label>Letter</label>
        <input type="text" name="description" class="input"/>
        </div>

        <button id="directMessage__submit">Save</button>
        <button id="directMessage__cancel>Cancel</button>
        <button id="directMessage__close">x</button>
        </section>
    `
    } else {
        return ""
    }
}