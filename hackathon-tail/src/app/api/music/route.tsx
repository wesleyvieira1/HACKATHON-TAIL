import { NextResponse } from "next/server";
const { Downloader } = require('ytdl-mp3');
import ytdl from 'ytdl-core';
import Moises from "moises/sdk";
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

export async function POST(req : Request, res : string) {
    const data = await req.json()

    if (data.linkidentificado.includes("youtube.com") || data.linkidentificado.includes("youtu.be")) {

        let url = data.linkidentificado;
        let videoId = ytdl.getURLVideoID(url);

        let stream = ytdl(videoId, {
            quality: 'highestaudio',
          });
        
        let directory = `./public/${videoId}.mp3`
          
        let start = Date.now();
        ffmpeg(stream)
          .audioBitrate(128)
          .save(directory)
          .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
          })
          .on('end', () => {
            console.log(`\ndone - ${(Date.now() - start) / 1000}s`);
        });

    }

    return NextResponse.json(data)
}