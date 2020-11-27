const express = require('express');
const cors = require('cors');
const { exec } = require("child_process");
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const directory = './tmp';

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
const telegram = require("./telegram");

const PATH = `https://converter.dev.YOURDOMAIN.com/`;

(async () => {
  const bot = telegram.bot;
  bot.start();
  bot.on("text", async function (msg) {
      let text;
      if (!msg.text) {
        text = 'Empty text';
      }
      const link = msg.text;
      const filename = link.substring(link.lastIndexOf('/') + 1, link.lastIndexOf('.'));
      await convert(link, filename);
      const file = new AdmZip();
      file.addLocalFolder('./tmp');
      file.writeZip('./public/' + filename + '.zip');
      text = PATH + filename + '.zip';
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });
      if (text) {
        await bot.sendMessage(msg.chat.id, text, {webPreview: false});
      }
    }
  );
})();



app.use(cors());
app.use(express.static('public'));

app.listen(PORT, HOST);
console.log(`Running`);

async function convert(link, filename) {
  return new Promise((resolve, reject) => {
    try {
      exec("cd tmp && ffmpeg -i " + link + " " +
        "-y " +
        "-vn " +
        "-ac 2 " +
        "-acodec aac " +
        "-f segment " +
        "-segment_format mpegts " +
        "-segment_time 5 " +
        `-segment_list ${filename}.m3u8 ${filename}-%05d.ts.ts`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject(error);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          resolve(stderr);
        } else {
          console.log(`stdout: ${stdout}`);
          resolve(stdout);
        }
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

