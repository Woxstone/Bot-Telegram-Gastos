import axios from 'axios';
// import cheerio from 'cheerio';
const cheerio = require('cheerio');
import Path from 'path';
import fs from 'fs';

export async function getImageRealteToConcept(concept) {
    const theimageurl = await getImage(concept);
    const thefile = await downloadImage(theimageurl, concept);

    return thefile;
}

async function getImage(concept) {
    const randomImage = Math.floor(Math.random() * 10)

    try {
        const response = await axios.get(`https://www.google.com/search?q=${concept}&tbm=isch`);

        return new Promise((resolve, reject) => {
            const $ = cheerio.load(response.data);
            const scrapedata = $("img");
console.log(scrapedata);
            let imageurl = (scrapedata[randomImage].attribs.src);
            resolve(imageurl);
            reject('error reject');
        });

    } catch (error) {
        console.log('el error');
        return new Promise((resolve, reject) => {
            resolve(false);
            reject('error reject');
        });
    }
};

async function downloadImage(imageUrl, imageName) {
    if (!imageUrl || imageName === '/addgasto') {
        return new Promise((resolve) => {
            resolve('./assets/oops.jpg');
        });
    }
    let pathImage = Path.resolve('images', `${imageName}.jpg`);
    const writer = fs.createWriteStream(pathImage)
    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve(pathImage))
        writer.on('error', reject)
    })
}