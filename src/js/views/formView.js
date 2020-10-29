
import { domElements as dom, domClasslists as classes } from './base';

const inputs = [dom.formName, dom.formYear, dom.formCategory, dom.formSubject, dom.formNumbers]

export const updateName = (value) => {   
    dom.userAll.forEach(user => user.textContent = value); 
};

export const retrieveName =()=>{
    localStorage.setItem('username', JSON.stringify(dom.formName.value));
    return dom.formName.value;
}; 

export const readNameStorage =()=> {
    const username = JSON.parse(localStorage.getItem('username'));
    if (username) return username;
}

export const disableInputName = () => {
    // || input === inputs[1] WE'LL HANDLE THIS WHEN MOBILE NUMBER IS AVAILABLE
    inputs[0].setAttribute('disabled', '');
    inputs[0].setAttribute('placeholder', 'username already set.');
};

export const clearInputs = () => {
    inputs.forEach(element => element.value = '');
    disableInputName();
};

export const getInputs = () => {
    const values = []; // 0= name, 1 = year, 2 = category, 3 = subject, 4 = numbers;
    inputs.forEach(e => values.push(e.value));
    return values;
};


