import axios from 'axios';
import cheerio from 'cheerio';

import path from 'path';
import fs from 'fs';
import { logger } from '../helpers/logger.js';

export async function getImageRealteToConcept(concept) {
    const theimageurl = await getImage(concept);
    const thefile = await downloadImage(theimageurl, concept);

    return new Promise((resolve) => resolve(thefile));
}

async function getImage(concept) {
    const randomImage = Math.floor(Math.random() * 10)

    try {
        const response = await axios.get(`https://www.google.com/search?q=${concept}&tbm=isch`);

        return new Promise((resolve) => {
            const $ = cheerio.load(response.data);
            const scrapedata = $("img");
            let imageurl = (scrapedata[randomImage].attribs.src);;
            resolve(imageurl);
        });

    } catch (error) {
        logger.error('error.getImage');
        return new Promise((resolve) => {
            resolve(false);
        });
    }
};

async function downloadImage(imageUrl, imageName) {
//quitar el addgasto sanitizar imageUrl
    if (!imageUrl || imageName === '/addgasto' || imageName.match(/\//gm)) {
        return new Promise((resolve) => {
            logger.info('error info');
            resolve('./assets/oops.jpg');
        });
    }
    let pathImage = path.resolve('images', `${imageName}.jpg`);
    const writer = fs.createWriteStream(pathImage);
    try {
        const response = await axios.get(imageUrl, {
            method: 'GET',
            responseType: 'stream'
        });
        response.data.pipe(writer)
    } catch (err) {
        logger.error('error.downloadImage');
        return new Promise((resolve) => {
            resolve('./assets/oops.jpg');
        });
    }
    
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve(pathImage))
        writer.on('error', reject('./assets/oops.jpg'))
    })
}