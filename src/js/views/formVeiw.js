
import { domElements as dom } from './base';

// collects info from api and uses it to fill select elemenst


const inputs = [dom.formName, dom.formMobile, dom.formYear, dom.formCategory, dom.formSubject, dom.formNumbers]

const clearInputs = () => {
    inputs.forEach(element => element.value = '');
};

export const getInputs = (e) => {
    e.preventDefault();
    inputs.forEach(element => element.value);
    clearInputs();
};

 