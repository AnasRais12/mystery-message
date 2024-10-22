import {z} from 'zod'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const userNameValidation = z
.string()
.max(12, { message: "Username must be 12 characters or less" })
.min(3, { message: "Username must be at least 3 characters long" })
.regex(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
  message: "Username must end with a number or symbol",
})

export const signUpSchema = z.object({
    username:userNameValidation,
    email: z.string().regex(emailRegex,"Email must be contain"),
    password: z.string().min(6,{message:'Password must be 6 Chararcter'})
    
})


  
