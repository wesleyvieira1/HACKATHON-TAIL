import { NextResponse } from "next/server";
const { Downloader } = require('ytdl-mp3');
import ytdl from 'ytdl-core';
import path from 'path';
import * as fs from "fs";

export async function POST(req : Request, res : string) {
    const data = await req.json()

    if (data.linkidentificado.includes("youtube.com")) {
        console.log("eh youtube")

        let url = data.linkidentificado;
        let videoId = ytdl.getURLVideoID(url);

        const output = path.resolve('.\\public', "audio.mp3");
        const video = ytdl(url, {filter:'audioonly'});
        
        video.pipe(fs.createWriteStream(output));

        video.on("end", () => {
            console.log("\nDownload Complete")

        })

    }

    return NextResponse.json(data)
}