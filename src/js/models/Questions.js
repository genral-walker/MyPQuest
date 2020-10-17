
export default class Questions {
    constructor (questions) {
        this.questions = questions;
        this.accumulator = 0;
    }

    loadQuestion() {
        console.log(this.accumulator);
        this.oneQuestion = this.questions[this.accumulator++]; 
        console.log(this.oneQuestion);
        console.log(this.accumulator);
        return this.oneQuestion;
    }

    get correctAnswer() {
        if (this.oneQuestion) {
            console.log(this.oneQuestion.answer);
            return this.oneQuestion.answer;
        }
    }
}