class Messages {
    static LITERALS = {
        'help': `Hola, estos son los comandos que puedes utilizar:
/nuevo_usuario para crearte un usuario en este chat,
/addgasto "cantidad" "concepto" "DD/MM/YYYY" introducira un gasto en la bolsa del chat linkeado a ti,
/gastos te devolvere los gastos de este chat,
/cuenta usa este comando para dividir los gastos del chat con aquellos que hayan participado.
Si tienes algun problema /help para saber los formatos de nuevo`,
        'intro': 'Soy un bot de gastos compartido',
        'expense.added': 'gasto registrado',
        'err.ledger': 'Ha habido un problema al registrar el gasto.',
        'user.new_user': 'usuario registrado',
        'bill': 'la cuenta',
        'user.hello': 'Hola',
        'user.create_ok': 'tu usuario ha sido creado.',
        'user.exits_end': 'tu usuario ya estaba creado en este chat.',
        'user.exits': 'usuario ya registrado',
        'error.users': 'Error al cargar los usuarios del Roster.',
        'error.expenses': 'Error al cargar los gastos del Ledger.',
        'message.quantity:': 'cantidad:',
        'message.article': 'El'
    };

    static retrieve(key) {
        return this.LITERALS[key];
    }

    static parse(stringmessage) {
        let result = stringmessage.split(' ').map(
            (word) => {
                const exist = (Messages.retrieve(word) != undefined);
                let partialResult = word;
                if (exist) {
                    partialResult = Messages.retrieve(word);
                }
                return partialResult;
            });

        return result.join(' ');
    }
}

export { Messages };