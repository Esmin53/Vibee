import type {  User, Message, Conversation  } from "@prisma/client"

/*export type ExtendedRequest = MessageRequest & {
    messages: Message[]
    sender: User,
    reciever: User
}*/

export type ExtendedMessage = Message & {
    sender: User,
    reciever: User
}

export type MessageType = {
    text: string
    image: string
    createdAt: Date,
    senderId: string
    recieverId: string
    conversationId: string
}

export type ConversationType = {
    name: string
    image: string
    text: string
    sentAt: Date
    senderId: string
    recieverId: string
    conversationId: string
    id: string
}

export type ExtendedConversation = Conversation & {
    messages: ExtendedMessage[]
}