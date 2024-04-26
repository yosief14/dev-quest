'use server'
import { db } from '../db'
import { InsertJobs, jobs } from '../schema'
import { auth } from '@/auth'

export async function addJob(data: any) {
    const session = await auth()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    try {
        const valueToAdd = { ...data, userId: session.user.id }
        console.log("🚀 ~ addJob ~ valueToAdd:", valueToAdd)
        const retValue = await db.insert(jobs).values(valueToAdd)
        return (JSON.stringify(retValue))
    } catch (e) {
        return (JSON.stringify(e))
    }
}
