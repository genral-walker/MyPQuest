
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

    get answered() {
        return this._answered
    }

    set answered(value) {
        this._answered = value
    }

    get questionLength() {
        return this._questionLength
    }

    set questionLength(value) {
        this._questionLength = parseFloat(value);
    }

    get accumulator() {
        return this._accumulator;
    }

    get startTimeAndDate() {
        let date = new Date();
        return {
            day: date.getDate(),
            month: date.getMonth(),
            year: parseFloat((date.getFullYear().toString()).slice(2)),
            hour: date.getHours(),
            minute: date.getMinutes()
        };
    }

    get session() {
        console.log(this.questions);
    }    

}