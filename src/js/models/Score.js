
export default class Score {
    constructor() {
        this._score = 0;
        this.highscoresData = [];
    }

    /*
        get new highscore:
        save to local storage
        retrievehighscores from local storage
        reshuffle the array then display the highscore
        if no new highscore, display the last reshsulffled highscore
    */

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    retrieveScore(formData, score) {
        const scoreData = {
            subject: formData.subject,
            category: formData.category,
            score: score
        };

        this.highscoresData.push(scoreData);
        this.updateHighscoresStorage();
    }

    updateHighscoresStorage() {
        this.highscoresData.sort((objA, objB) => objB.score - objA.score);
        this.highscoresData.splice(5);
        localStorage.setItem('highscores', JSON.stringify(this.highscoresData));
    }


    retrieveHighscoresStorage() {
        const highscores = JSON.parse(localStorage.getItem('highscores'));
        if (highscores) {
            this.highscoresData = highscores;
            return this.highscoresData;
        }
    }
};