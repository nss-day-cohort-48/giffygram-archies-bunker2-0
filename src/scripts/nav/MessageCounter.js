import { getMessages } from "../data/provider.js"


export const MessageCounter = (currentUser) => {
    const messages = getMessages()
    
    const currentUserUnreadMessages = messages.filter(message => message.recipientId === currentUser && message.read === false)

    const messageCount = currentUserUnreadMessages.length

    return messageCount

}