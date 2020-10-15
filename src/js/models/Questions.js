
export default class Questions {
    constructor (questions) {
        this.questions = questions;
    }

    loadQuestion() {
        let accumulator = 0;
        console.log(accumulator);
        this.oneQuestion = this.questions[++accumulator]; 
        return this.oneQuestion;
    }

    get correctAnswer() {
        if (this.oneQuestion) {
            console.log(this.oneQuestion.answer);
            return this.oneQuestion.answer;
        }
    }
}