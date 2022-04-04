import { en } from '../../lenguaje/en.js';
import { es } from '../../lenguaje/es.js';

const default_language = 'es';

class Messages {
    static LITERALS = {
        'es': es,
        'en': en
    }

    static retrieve(leg = default_language, key) {
    return this.LITERALS[leg][key];
}

    static parse(leg = default_language, messageWithKeys) {
    const midMessage = messageWithKeys.replace(/\n/g, '\n ');
    const messageWithOutKeys = midMessage.split(' ').map(
        (word) => {
            const exist = (Messages.retrieve(leg, word) != undefined);
            let partialResult = word;
            if (exist) {
                partialResult = Messages.retrieve(leg, word);
            }
            return partialResult;
        });

    const message = messageWithOutKeys.join(' ').replace(/\n /g, '\n')
    return message;
}
}

export { Messages };