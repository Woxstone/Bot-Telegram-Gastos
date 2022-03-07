import fs from 'fs';
import { logger } from '../../src/helpers/logger.js';

const load = (path) => {
    try {
        const infoRequire = JSON.parse(fs.readFileSync(path));
        return infoRequire;
    } catch (err) {
        logger.info(`error.${path}.load`);
        return false;
    }
}

const save = (path, info) => {
    try {
        // fs.writeFileSync(path, JSON.stringify(info));
        fs.writeFileSync(path, info);
        return true;
    } catch (err) {  
        logger.error(`error.${path}.save`);
        return false;
    }
}

export { load, save };