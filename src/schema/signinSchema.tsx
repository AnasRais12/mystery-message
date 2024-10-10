import {z} from 'zod'

export const signInSchema = z.object({
    identfire:z.string(),
    password:z.string()
})