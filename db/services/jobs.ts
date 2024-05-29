'use server'
import { and, eq } from 'drizzle-orm'
import { db } from '../db'
import { jobs } from '../schema'
import puppeteer from 'puppeteer';
import { auth } from '@/auth'

export async function addJob(data: any) {
    const session = await auth()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    try {
        const valueToAdd = { ...data, userId: session.user.id }
        const retValue = await db.insert(jobs).values(valueToAdd)
        return (JSON.stringify(retValue))
    } catch (e) {
        return (JSON.stringify(e))
    }
}

export async function editJob(data: any, jobId: string) {
    const session = await auth()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    try {
        console.log(data, jobId)
        const valueToEdit = { ...data }
        const retValue = await db.update(jobs).set(valueToEdit).where(and(eq(jobs.id, jobId), eq(jobs.userId, session.user.id)))
        return (JSON.stringify(retValue))
    } catch (e) {
        return (JSON.stringify(e))
    }
}

export async function getJobPosts(id: string = 'all') {
    //if the session.id is not equal to the user.id, return unauthorized
    const session = await auth()
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }
    if (id === 'all') {
        const result = await db.select().from(jobs).where(eq(jobs.userId, session.user.id))
        return result
    }
}

export async function autoFill(url: string) {
   
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // console.log(url)
    // await page.goto(url);
    // console.log(typeof page.content())
    // // console.log("CALLLLED")
    // const content = await page.content()
    // const resultHtml = JSON.stringify(content)
    // return resultHtml
    // const session = await auth()
    // if (!session?.user) {
    //     throw new Error("Unauthorized")
    // }

    // const header: RequestInit = {
    //     mode: 'cors',
    //     method: 'GET',
    // }
    // try {
    //     const response = await fetch(url, header)
    //     console.log(response)
    //     return JSON.stringify(response.body)
    // }
    // catch (error) {
    //     console.log(error)
    //     return JSON.stringify(error)
    // }

}