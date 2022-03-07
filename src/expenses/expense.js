import 'dotenv/config';

class Expense{
    constructor(theExpense){
        this.money = theExpense.money,
        this.concept = theExpense.concept,
        this.date = theExpense.date || this.today(),
        this.user_id = theExpense.user_id 
    }

    today() {
        const today = new Intl.DateTimeFormat(process.env.LOCALE_DATE_FORMAT, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(Date.now());
        return today;
    }

    description() {
        const concept = (this.concept == '')? 'expense.description_noConcept': this.concept;
        return `message.article ${this.date}, /ID:${this.user_id} message.person message.quantity: ${this.money}€, ${concept}`;
    }
}

export {Expense}