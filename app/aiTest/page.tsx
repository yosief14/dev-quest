'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function Home() {

    /* TODO: Add state variables */
    const [result, setResult] = useState(false);
    const [ready, setReady] = useState(false);
    // Create a reference to the worker object.
    const worker = useRef<Worker>(null!);

    // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
    useEffect(() => {
        // Update the type of the worker reference to allow both null and Worker types.

        if (!worker.current) {
            // Create the worker if it does not yet exist.
            worker.current = new Worker(new URL('/workers/worker.js', import.meta.url), {
                type: 'module'
            });
        }
        const langChainWoker = new Worker(new URL('/workers/langchain.js', import.meta.url), {
            type: 'module'
        });
        // Create a callback function for messages from the worker thread.
        const onMessageReceived = (e: any) => {
            switch (e.data.status) {
                case 'initiate':
                    setReady(false);
                    break;
                case 'ready':
                    setReady(true);
                    break;
                case 'complete':
                    setResult(e.data.output[0])
                    break;
            }
        };
        // Attach the callback function as an event listener.
        worker.current?.addEventListener('message', onMessageReceived);

        // Define a cleanup function for when the component is unmounted.
        return () => worker.current?.removeEventListener('message', onMessageReceived);
    });

    const classify = useCallback((text: any) => {
        if (worker.current) {
            worker.current.postMessage({ text });
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-12">
            <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
            <h2 className="text-2xl mb-4 text-center">Next.js template</h2>

            <input
                className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
                type="text"
                placeholder="Enter text here"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    classify(e.target.value);
                }}
            />

            {ready !== null && (
                <pre className="bg-gray-100 p-2 rounded">
                    {(!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
                </pre>
            )}
        </main>
    )
}