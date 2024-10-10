import {z} from 'zod'

export const messageSchema = z.object({
    content: z.string().max(250,{message: "200 Limits "}),
    createdAt: z.date()

})