class Parser{

    static extractMoney(message){
        let result = parseFloat(message.split(' ').find(function(word) {
            if(!isNaN(parseInt(word))) {
                return word;
            }}));
        return result;
    }
    
    static extractConcept(message){
        let result = message.split(' ').filter(function(word){
            if(isNaN(parseInt(word))){
                return word;
            }
        });

        result = result.join(' '); 
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