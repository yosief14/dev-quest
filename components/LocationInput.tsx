'use server'

export async function getLocations(inputValue: string) {

    const locations = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
        `input=${inputValue}&types=%28cities%29&components=country:us&` +
        `key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)

    const data = await locations.json();

    console.log(data)



}