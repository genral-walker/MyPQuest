
import axios from 'axios';
const cors = 'https://cors-anywhere.herokuapp.com/';

export default class Form {
    constructor(values) {
        this.values = values;
    }

    async submitQuery() {
        try {
            this.results = await axios(`${cors}https://questions.aloc.ng/api/q/${this.values[5]}?subject=${this.values[4]}&year=${this.values[2]}&type=${this.values[3]}`);
            return this.results.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}