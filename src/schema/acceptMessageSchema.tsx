import {z} from 'zod'

export const acceptMessages = z.object({
    acceptMessage:z.boolean(),
})