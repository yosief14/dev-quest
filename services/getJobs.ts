'use server'
import { cache } from 'react'
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { jobs } from "@/db/schema"
import { auth } from "@/auth"
export async function getJobPosts(id: string = 'all') {
    //if the session.id is not equal to the user.id, return unauthorized
    const session = await auth()
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }
    if (id === 'all') {
        const result = await db.select().from(jobs).where(eq(jobs.userId, session.user.id))
        console.log(result)
        return result
    }
}
