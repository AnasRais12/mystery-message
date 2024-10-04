import {z} from 'zod'

export const userNameValidation = z
.string()
.min(2,'Username minimum must be at least 2 characers')
.max(20,'Username minimum must be at least 20 characers')

export const signUpSchema = z.object({
    
})


  
