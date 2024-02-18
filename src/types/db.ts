import type {  User, Message,  } from "@prisma/client"

/*export type ExtendedRequest = MessageRequest & {
    messages: Message[]
    sender: User,
    reciever: User
}*/

export type ExtendedMessage = Message & {
    sender: User,
    reciever: User
}

export type ConversationType = {
    name: string
    image: string
    text: string
    sentAt: Date
    senderId: string
    conversationId: string
    id: string
}