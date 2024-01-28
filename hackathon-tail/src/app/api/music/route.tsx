import { NextResponse } from "next/server";
import ytdl from 'ytdl-core';
import Moises from "moises/sdk.js";
const ffmpeg = require('fluent-ffmpeg');
import fs from 'fs';

async function downloadVideo(url : string) {
    try {

      let videoId = ytdl.getURLVideoID(url);

      let stream = ytdl(videoId, {
          quality: 'highestaudio',
        });
    
      const directory = `./public/input/${videoId}.mp3`;
        
      let start = Date.now();

      ffmpeg(stream)
      .audioBitrate(128)
      .save(directory)
      .on("start", () => {
      console.log("started download");
      })
      .on('end', () => {
        console.log(`\ndone - ${(Date.now() - start) / 1000}s`);
      });
    }
    catch(error) {
      console.error(error)
    }
  };

  

async function getTracks(key : string) {
  const moises = new Moises({ apiKey : key});
  moises.processFolder(
    "TRACK_SEPARATION",
    "./public/input",
    "./public/output",
    {}
  )
}

function getFolderNames(directory : string) {
  fs.readdir(directory, (error, files) => {
    if (error) {
      console.error(error)
    }
    return files
  })
}

async function getTimeStamp(key : string) {
  const moises = new Moises({apiKey : key})
 
  //const folderName: string[] = getFolderNames('public/output/tracks');
  const folderName = fs.readdirSync('./public/output/tracks')
  console.log(`./public/output/tracks/${folderName[0]}`)
  console.log(`./public/output/tracks/${folderName[1]}`)

  await moises.processFolder(
    "GET_TIMESTAMPS",
    `./public/output/tracks/${folderName[0]}`,
    "./public/output/timestamps",
    {}
  );
  await moises.processFolder(
    "GET_TIMESTAMPS",
    `./public/output/tracks/${folderName[1]},`,
    "./public/output/timestamps",
    {}
  );

    }

async function getDelay(seconds : number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Async operation completed');
      }, 1000 * seconds);
    });
  }

export async function POST(req : Request, res : string) {
    const data = await req.json()
    
    let url = data.linkidentificado;
    let links = [url, 'https://www.youtube.com/watch?v=8ESd3A9D-3E&ab_channel=BalaclavaRecords']

    //console.log(links)

    try {

      //await downloadVideo(links[0]);
      //await downloadVideo(links[1]);
      //await getDelay(15);

      //await getTracks(`${process.env.API_KEY}`);
      //await getDelay(25);

      await getTimeStamp(`${process.env.API_KEY}`);
      //await getDelay(10)

      return NextResponse.json({data})

      
    } catch (error) {
      console.log(error)
      return NextResponse.json({error})
    }

    }