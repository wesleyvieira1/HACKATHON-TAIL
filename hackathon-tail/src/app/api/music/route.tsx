import { NextResponse } from "next/server";
const { Downloader } = require('ytdl-mp3');
import ytdl from 'ytdl-core';
import Moises from "moises/sdk.js";
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
        
        let directory = `./public/input/${videoId}.mp3`;
          
        let start = Date.now();
        await ffmpeg(stream)
          .audioBitrate(128)
          .save(directory)
          .on("start", () => {
            console.log("started download");
          })
          .on('end', () => {
            console.log(`\ndone - ${(Date.now() - start) / 1000}s`);

            const key = `${process.env.API_KEY}`

            const moises = new Moises({ apiKey : key});
            moises.processFolder(
              "TRACK_SEPARATION",
              "./public/input",
              "./public/output",
              {}
            )

        });

          /*await moises.processFolder(
            "GET_TIMESTAMPS",
            "./public/input",
            "./public/output",
            {}
        );*/

        //const resultado = require (`C:/Users/Pedro/Documents/GitHub/HACKATHON-TAIL/hackathon-tail/public/output/${videoId}/RESULTADO.json`)
        //console.log(resultado[0])
    }
    return NextResponse.json(data)
}