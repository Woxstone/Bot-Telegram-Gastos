class Parser {

    static extractMoney(message) {
        const money = parseFloat(message.split(' ').find(function (word) {
            if (!isNaN(parseInt(word))) {
                return word;
            }
        }));
        return money;
    }

    static extractConcept(message) {
        const conceptInArray = message.split(' ').filter(function (word) {
            if (isNaN(parseInt(word))) {
                return word;
            }
        });

        const concept = conceptInArray.join(' ');
        return concept;
    }

    static extractDate(message) {
        const possibleMatch = message.match(/ \d+\/\d+\/\d+/gm);
        const date = (possibleMatch) ? possibleMatch[0].trim() : undefined;

        return date;
    }

    static extractId(user_ctx) {
        const id = user_ctx.id;
        return id;
    }

    static extractFirstName(user_ctx) {
        const firstName = user_ctx.first_name
        return firstName;
    }

    static extractName(user_ctx) {
        const name = user_ctx.username
        return name;
    }
}

export { Parser };