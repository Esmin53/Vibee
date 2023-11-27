import type { MessageRequest, Conversation, User, Message,  } from "@prisma/client"

export type ExtendedRequest = MessageRequest & {
    messages: Message[]
    sender: User,
    reciever: User
}

export type ExtendedMessage = Message & {
    sender: User,
    reciever: User
}