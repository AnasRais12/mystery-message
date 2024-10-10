import {z} from 'zod'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const userNameValidation = z
.string()
.min(2,'Username minimum must be at least 2 characers')
.max(200,'Username minimum must be at least 200 characers')

export const signUpSchema = z.object({
    username:userNameValidation,
    email: z.string().regex(emailRegex,"Email must be contain"),
    password: z.string().min(6,{message:'Password must be 6 Chararcter'})
    
})


  
