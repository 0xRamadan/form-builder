import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().min(250).optional()
})

export type formSchemaType = z.infer<typeof formSchema>
