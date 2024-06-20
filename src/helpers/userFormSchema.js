import { z } from 'zod'

export const NewUserFormSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres',
      })
      .max(32, {
        message: 'El nombre de usuario debe tener menos de 32 caracteres',
      }),
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
    password: z
      .string()
      .min(3, { message: 'La contraseña debe tener al menos 6 caracteres' })
      .max(32, { message: 'La contraseña debe tener menos de 32 caracteres' }),
    password2: z
      .string()
      .min(3, { message: 'La contraseña debe tener al menos 6 caracteres' })
      .max(32, { message: 'La contraseña debe tener menos de 32 caracteres' }),
    role: z.string({ required_error: 'El rol es requerido' }),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Los passwords no coinciden',
    path: ['password2'],
  })
