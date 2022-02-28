class Parser{

    static extractMoney(message){
        const result = parseFloat(message.split(' ')[0]); 
        return result;
    
    }
    
    static extractConcept(message){
        let result = message.split(' ').slice(1).join(' '); 
        result = result.replace(/ \d+\/\d+\/\d+/gm,'');
        return result;
    }

    static extractDate(message) {
        const result = message.match(/ \d+\/\d+\/\d+/gm);
        
        return (result)?result[0].trim():undefined;
    }

    static extractId(from) { return from.id; }

    static extractFirstName(from) { return from.first_name; }

    static extractName(from) { return from.username; }
}

export {Parser};