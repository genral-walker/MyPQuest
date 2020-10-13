
export default class Questions {
    constructor (questions) {
        this.questions = questions;
    }

    loadQuestions() {
        let accumulator = 0;
        console.log(accumulator);
        return this.questions[++accumulator];   
    }
}