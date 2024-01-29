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
    "./public/output/tracks",
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
    "./public/output/timestampsOne",
    {}
  );
  await moises.processFolder(
    "GET_TIMESTAMPS",
    `./public/output/tracks/${folderName[1]}`,
    "./public/output/timestampsTwo",
    {}
  );

  return folderName
    }

async function cutAudios(file: string, start: number, output: string) {
  ffmpeg()
  .input(file)
  .seekInput(start)
  .duration(20)
  .output(output)
  .on("end", () => {
    console.log("Cutting completed")
  })
  .run()
}

async function processAudios(folders : string[]) {
  var count = 1
  const newFolder = folders.filter(item => item !== 'cutTracks')
  newFolder.forEach(element => {
    if (count == 1) {
      console.log(`count = ${count}`)
      console.log(element)
      const drumsData =  JSON.parse(fs.readFileSync('./public/output/timestampsOne/drums/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/drums.wav`,parseInt(drumsData[0].start), `./public/output/tracks/cutTracks/${element}_drums.mp3`)
      const guitarData =  JSON.parse(fs.readFileSync('./public/output/timestampsOne/guitars/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/guitars.wav`,parseInt(guitarData[0].start), `./public/output/tracks/cutTracks/${element}_guitars.mp3`)
      const pianoData =  JSON.parse(fs.readFileSync('./public/output/timestampsOne/piano/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/piano.wav`,parseInt(pianoData[0].start), `./public/output/tracks/cutTracks/${element}_piano.mp3`)

      const instrumentCutStamps = [drumsData, guitarData, pianoData]

      instrumentCutStamps.forEach(element => {
        console.log(element[0].start)
      });

      count++;
    }
    else if (count == 2) {
      console.log(`count = ${count}`)
      console.log(element)

      const drumsData =  JSON.parse(fs.readFileSync('./public/output/timestampsTwo/drums/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/drums.wav`,parseInt(drumsData[0].start), `./public/output/tracks/cutTracks/${element}_drums.mp3`)
      const guitarData =  JSON.parse(fs.readFileSync('./public/output/timestampsTwo/guitars/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/guitars.wav`,parseInt(guitarData[0].start), `./public/output/tracks/cutTracks/${element}_guitars.mp3`)
      const pianoData =  JSON.parse(fs.readFileSync('./public/output/timestampsTwo/piano/RESULTADO.json'))
      cutAudios(`./public/output/tracks/${element}/piano.wav`,parseInt(pianoData[0].start), `./public/output/tracks/cutTracks/${element}_piano.mp3`)

      const instrumentCutStamps = [drumsData, guitarData, pianoData]

      instrumentCutStamps.forEach(element => {
        console.log(element[0].start)
      })
    }
  });
}

async function uploadFiles(key : string) {
  const files = fs.readdirSync("public/output/tracks/cutTracks")
  const moises = new Moises({apiKey : key})
  var allLinks: string[] = []

  const downloadLink1 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[0]}`)
  allLinks.push(downloadLink1)
  const downloadLink2 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[1]}`)
  allLinks.push(downloadLink1)
  const downloadLink3 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[2]}`)
  allLinks.push(downloadLink1)
  const downloadLink4 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[3]}`)
  allLinks.push(downloadLink1)
  const downloadLink5 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[4]}`)
  allLinks.push(downloadLink1)
  const downloadLink6 = await moises.uploadFile(`./public/output/tracks/cutTracks/${files[5]}`)
  allLinks.push(downloadLink1)
  
  return allLinks

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
    console.log(data)
    
    let links = [data.linkIdentificado1, data.linkIdentificado2]

    console.log(links)

    try {

      await downloadVideo(links[0]);
      await downloadVideo(links[1]);
      await getDelay(20);

      await getTracks(`${process.env.API_KEY}`);
      await getDelay(30);

      const folders = await getTimeStamp(`${process.env.API_KEY}`);
      await getDelay(40)
      await processAudios(folders)
      await getDelay(20)
      const resData = await uploadFiles(`${process.env.API_KEY}`)
      await getDelay(30)

      return NextResponse.json({resData})

    } catch (error) {
      console.log(error)
      return NextResponse.json({error})
    }

  }