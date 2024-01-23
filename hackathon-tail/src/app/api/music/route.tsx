import { NextResponse } from "next/server";

export async function POST(req : Request, res : string) {
    const data =await req.json()

    if (data.linkidentificado.includes("spotify.com")) {
        console.log("eh spotify")
    } else if (data.linkidentificado.includes("youtube.com")) {
        console.log("eh youtube")
    } else if (data.linkidentificado.includes("deezer.com")) {
        console.log("eh deezer")
    }

    return NextResponse.json(data)
}