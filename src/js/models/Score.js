
export default class Score {
    constructor() {
        this._score = 0 ;
    }

    get score() {
        ++this._score;
        return this._score;
    }

    set score(value) {
        this._score = value;
    }
};