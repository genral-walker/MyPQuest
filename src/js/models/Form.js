
import axios from 'axios';

export default class Form {
    constructor (inputValues) {
        this.inputValues = inputValues;
    }

    /**
     * - If any of the query isn't avialabe:
     *      give the user the most popular query in descending order
     *      Tell the user to try again
     * */ 
    async submitQuery() {
        try {
            const res = await axios(`https://questions.aloc.ng/api/q/${this.inputValue[5]}?subject=${this.inputValues[4]}`);
              console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
};

/*

*/