
import { domElements as dom, domClasslists as classes } from './base';

const inputs = [dom.formName, dom.formMobile, dom.formYear, dom.formCategory, dom.formSubject, dom.formNumbers]



export const updateName = () => {
    dom.userAll.forEach(user => user.textContent = dom.formName.value)
};


// collects info from form to use in makin api call
const makeOptional = () => {
    // || input === inputs[1] WE'LL HANDLE THIS WHEN MOBILE NUMBER IS AVAILABLE
    inputs[0].setAttribute('disabled', '');
    inputs[0].setAttribute('placeholder', 'username already set.');
};

export const clearInputs = () => {
    makeOptional();
    inputs.forEach(element => element.value = '');
};

export const getInputs = () => {
    let values = []; // 0= name, 1 = mobile, 2 = year, 3 = category, 4 = subject, 5 = numbers;
    inputs.forEach(e => values.push(e.value));
    return values;
};


