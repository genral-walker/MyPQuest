
export default class Questions {
    constructor(questions) {
        this.questions = questions;
        this._accumulator = 0;
        this._questionLength;
        this._answered = false;
    }

    loadQuestion() {
        this.oneQuestion = this.questions[this._accumulator++];
        return this.oneQuestion;
    }

    get correctAnswer() {
        if (this.oneQuestion) {
            return this.oneQuestion.answer;
        }
    }

    // JUST TOGGLERS FOR ANSWERING QUESTIONS
    get answered() {
        return this._answered
    }

    set answered(value) {
        this._answered = value
    }
    // ENDS HERE

    get questionLength() {
        let length = this.questions.length;
        return length
    }

    get accumulator() {
        return this._accumulator;
    }

}