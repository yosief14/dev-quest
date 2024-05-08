
import { z } from 'zod';

export const jobFormSchema = z.object({
    company: z.string().min(3).max(50),
    companySite: z.string().url(),
    positionLink: z.string(),
    positionTitle: z.string().min(3).max(50),
    applicationDate: z.date(),
    postDate: z.date(),
    location: z.string().max(50),
    description: z.string().min(10).max(10000),
})