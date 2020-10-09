
import axios from 'axios';
const cors = 'https://cors-anywhere.herokuapp.com/';

export default class Form {
    constructor(values) {
        this.values = values;
    }

    /**
     * - If any of the query isn't avialabe:
     *      give the user the most popular query in descending order
     *      Tell the user to try again
     * */
    async submitQuery() {
        try {
            const res = await axios(`${cors}https://questions.aloc.ng/api/q/${this.values[5]}?subject=${this.values[4]}&year=${this.values[2]}&type=${this.values[3]}`);
            res.message ? console.log(res.message) : console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
};

/*

*/