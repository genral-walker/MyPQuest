///// THE OLD CODE
const nothing = () => {
    /*  
    let isClicked = false;
    let rightAns = 0;
    let wrongAns = 0;
    let score = 0;
    let PageNum = 1;
    
    const processQuestion = () => {
        let rightOption = pagesAnswer[`page${PageNum}`];
        for (let i = 0; i < 4; i++) {
            document.querySelectorAll('.box')[i].addEventListener('click', (e) => {
                if (e.target.classList.contains(rightOption)) {
                    e.target.classList.add('right');
                    score++;
                    rightAns++;
                    document.querySelector('.rightAns').textContent = rightAns;
                    document.querySelector('.point').textContent = score;
                } else {
                    e.target.classList.add('wrong');
                    document.querySelector(`.${rightOption}`).classList.add('right');
                    wrongAns++;
                    document.querySelector('.wrongAns').textContent = wrongAns;
                };
    
                if (PageNum == 5){
                    setTimeout(()=>{
                        document.querySelector('.left-aside').style.height = '46vh';
                        document.querySelectorAll('.hide')[0].classList.remove('invisible');
                        document.querySelectorAll('.hide')[1].classList.remove('invisible');
                        document.querySelector('button').remove();
                        document.querySelector(`#qbox`).style.pointerEvents='none';
                    }, 1400)
                    return;
                };
    
                isClicked = true;
                document.querySelector(`#qbox`).style.pointerEvents='none';
                setTimeout(() => { btnHover() }, 900);
            });
        };            
    };
    
    const nextPage = () => {
        processQuestion();
        document.querySelector('button').addEventListener('click', () => {
            if (isClicked === false) {
                return;
            };
    
            setTimeout(() => {
                let container = document.querySelector(`#qbox`);
                container.innerHTML = pages[`page${++PageNum}`];
                isClicked = false;
                processQuestion();
            }, 300);
            
             document.querySelector(`#qbox`).style.pointerEvents='auto';
        });
    };
    
    nextPage();
    
    */};

import Form from './models/Form';
import Questions from './models/Questions';
import { domElements as dom, addClass, handleLoader } from './views/base';
import { detailsToggle, tableToggle, closeDetails } from './views/detailsVeiw';
import { animatePageOnLoad, animateStart, reverseStartAnimation } from './views/gsap';
import { getInputs, clearInputs } from './views/formVeiw';


/** Global state of the app
 * -
 */

let state = {};

//TESTERS
const hello = (e) => {
    console.log(e.target);
};



/**   //MYPQUEST LOGIC
 * - Do some animations when page loads //DONE
 * - Make the profile button bring out the overview //DONE
 * - receive details inputed from the form //Done
 * - validate the inputs from the form before game starts // Partilly Done
 * - Use details from form to start gameplay
 * - ADD checks for when number is below 0
 * */


//////////GSAP ANIMATION ON PAGELOAD
window.addEventListener('load', animatePageOnLoad);


///// ADDS AN EVENT CLASS TO ALL ELEMENTS IN DOMCLASSLIST USED TO NULIFY DETAILS SLIDE EVENT. 
addClass(dom.hasEvent);



/*
******  DETAILS-VIEW CONTROLLER *******
*/
//////// TOGGLE DETAILS SECTION
dom.hasEvent.profileBtn.addEventListener('click', detailsToggle)
//////// TOGGLE DETAILS TABLE SECTION
dom.hasEvent.detailScore.addEventListener('click', tableToggle)
///////// CLOSE DETAILS SECTION
document.addEventListener('click', closeDetails);


//// GET INPUTS FROM FORM 
const submitData = async () => {
    let query;
    query = getInputs();
    state.form = new Form(query);
    try {
        clearInputs();
        handleLoader();

        let res = await state.form.submitQuery();

        state.questions = new Questions(res);
        let questions = state.questions;
        if (questions) {
            let only1 = state.questions.loadQuestions();
            console.log(only1);
            handleLoader();
            setTimeout(() => {
                animateStart();
            }, 250);
        }

    } catch (error) {
        handleLoader();
        alert('Uh Uh Something Went Wrong, It May Be Poor Connection or Delay In Response. please try again. 😢');
    }
};



//////// UPDATE PROFILE NAME
const updateName = () => {
    dom.userAll.forEach(user => user.textContent = dom.formName.value)
};
dom.formName.addEventListener('input', updateName);


//////// GAME START AFTER INPUTS RECEIVED SUCCESFULLY
dom.form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitData();
});


/////LOAD NEXT QUESTION AFTER EVERY ANSWERED QUESTION



///// EXITING THE GAME
const exitGame = () => reverseStartAnimation();
dom.hasEvent.btnExit.addEventListener('click', exitGame);

