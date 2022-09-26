const cherio = require("cherio");

const request = require("request");

const imageDownloader = require("node-image-downloader");

const imagelinks = [];

request("https://www.growpital.com", (err, res, html) => {
  if (!err && res.statusCode == 200) {
    console.log("Successfully Done");

    const $ = cherio.load(html);

    $("img").each((index, image) => {
      let img = $(image).attr("src");
      let Links = img;
      imagelinks.push(Links);
      console.log(imagelinks);
      for (let i = 0; i < imagelinks.length; i++) {
        imageDownloader({
          imgs: [
            {
              uri: imagelinks[i],
            },
          ],
          dest: "./downloads", //destination folder
        })
          .then((info) => {
            console.log("all done", info);
          })
          .catch((error, response, body) => {
            console.log(error);
          });
      }
    });
  } else {
    console.log(err);
    console.log("Request Failed ");
  }
});
