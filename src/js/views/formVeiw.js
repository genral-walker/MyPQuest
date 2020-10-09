
import { domElements as dom, domClasslists as classes } from './base';

//Validate Form
/**
 * username must be a string of LETTERS, not '   ', etc nothing else
 * mobile number must be a number, must also not contain number letters,  '   ' etc., must be nigerian number
 * */
const inputs = [dom.formName, dom.formMobile, dom.formYear, dom.formCategory, dom.formSubject, dom.formNumbers]

/*
export const validateForm = (e) => {
    if (e.target === dom.formName) {
        if (e.target.value === ' ' || e.target.value === '  ' || e.target.value === '   ' || e.target.value === '    ') {
            e.target.textContent = ': cannot contain spaces';
            console.log(e.target.textContent);
            e.target.classList.add(dom.slideValidator);
        } else if (parseFloat(e.target.textContent)) {
            e.target.textContent = ': cannot contain numbers';
            console.log(e.target.textContent);
                e.target.classList.add(dom.slideValidator);
        } else {
            console.log('All set');
            dom.validateName.classList.remove(classes.slideValidator)
        }
    }
};
*/

// collects info from form to use in makin api call


const clearInputs = () => {
    inputs.forEach(element => element.value = '');
};

export const getInputs = () => {
    let values = []; // 0= name, 1 = mobile, 2 = year, 3 = category, 4 = subject, 5 = numbers;
     inputs.forEach(e => {
    values.push(e.value);
   });
   clearInputs();
   return values;
};


