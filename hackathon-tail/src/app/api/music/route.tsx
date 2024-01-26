import { NextResponse } from "next/server";
const { Downloader } = require('ytdl-mp3');
import ytdl from 'ytdl-core';
import path from 'path';
//import ffmpeg from 'fluent-ffmpeg';
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');
import * as fs from "fs";

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