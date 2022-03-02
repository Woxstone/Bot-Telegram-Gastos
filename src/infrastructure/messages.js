class Messages {
    static LITERALS = {
        'help': `Hola, estos son los comandos que puedes utilizar:
/nuevo_usuario para crearte un usuario en este chat,
/addgasto "cantidad" "concepto" "DD/MM/YYYY" introducira un gasto en la bolsa del chat linkeado a ti,
/gastos te devolvere los gastos de este chat,
/cuenta usa este comando para dividir los gastos del chat con aquellos que hayan participado.
Si tienes algun problema /help para saber los formatos de nuevo`,
        'intro': 'Soy un bot de gastos compartido',
        'expense.added': 'Gasto registrado',
        'expenses.error_save': 'Error al grabar tu gasto (problemas en Ledger.addAndSave).',
        'expense.description_noConcept': 'Sin concepto',
        'bill': 'La cuenta',
        'user.hello': 'Hola',
        'user.new_user': 'Usuario registrado',
        'user.create_ok': 'tu usuario ha sido creado.',
        'user.exits_end': 'tu usuario ya estaba creado en este chat.',
        'user.exits': 'Usuario ya registrado',
        'user.debt': 'le debe a',
        'error.users': 'Error al cargar los usuarios del Roster.',
        'error.expenses': 'Error al cargar los gastos del Ledger.',
        'error.ledger': 'Ha habido un problema al registrar el gasto.',
        'message.quantity:': 'cantidad:',
        'message.article': 'El',
        'message.person': 'metio un gasto de'
    };

    static retrieve(key) {
        return this.LITERALS[key];
    }

    static parse(messageWithKeys) {
        const midMessage = messageWithKeys.replace(/\n/g, '\n ');
        const messageWithOutKeys = midMessage.split(' ').map(
            (word) => {
                const exist = (Messages.retrieve(word) != undefined);
                let partialResult = word;
                if (exist) {
                    partialResult = Messages.retrieve(word);
                }
                return partialResult;
            });

        const message = messageWithOutKeys.join(' ').replace(/\n /g, '\n')
        return message;
    }
}

export { Messages };