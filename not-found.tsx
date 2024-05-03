import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
    const headersList = headers()
    const domain = headersList.get('host')
    return (
        <div>
            <h2>Sorry but we couldn't find the page your looking for </h2>
            <p>
                View <Link href="/">Return to Home page</Link>
            </p>
        </div>
    )
}
