import { z } from "zod";

export const MessageValidator = z.object({
    recieverId: z.string(),
    text: z.string() 
})

export type MessageRequest = z.infer<typeof MessageValidator>