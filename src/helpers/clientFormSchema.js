import { z } from 'zod'

export const NewClientFormSchema = z.object({
  clientType: z.string({ required_error: 'El tipo de cliente es requerido' }),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(32, { message: 'El nombre debe tener menos de 32 caracteres' }),
  lastname: z
    .string()
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(32, { message: 'El apellido debe tener menos de 32 caracteres' }),
  email: z
    .string()
    .email()
    .min(3, { message: 'El email debe tener al menos 3 caracteres' })
    .max(32, { message: 'El email debe tener menos de 32 caracteres' }),
  phone: z.string(),
})

export const NewClientCompanyFormSchema = z.object({
  clientType: z.string({ required_error: 'El tipo de cliente es requerido' }),
  contactName: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(32, { message: 'El nombre debe tener menos de 32 caracteres' }),
  contactLastname: z
    .string()
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(32, { message: 'El apellido debe tener menos de 32 caracteres' }),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  companyName: z
    .string()
    .min(3, { message: 'La empresa debe tener al menos 3 caracteres' })
    .max(32, { message: 'La empresa debe tener menos de 32 caracteres' }),
})
