
import Form from './models/Form';
import Questions from './models/Questions';
import { domElements as dom, domClasslists, addClass, handleLoader } from './views/base';
import { detailsToggle, tableToggle, closeDetails } from './views/detailsVeiw';
import { animatePageOnLoad, animateStart, reverseStartAnimation } from './views/gsap';
import { getInputs, clearInputs, updateName} from './views/formVeiw';
import { renderQuestionsAndAnswers as renderQuestion, clearColors, isCorrect, addHover } from './views/questionsView';


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
const processDataToStart = async () => {
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
            let oneQuestion = state.questions.loadQuestion();

            handleLoader();

            setTimeout(() => {
                renderQuestion(oneQuestion);

                // THIS INITIALIZES THE CORRECT THESE FUNCTIONS OUTSIDE OF THIS SCOPE
                state.questions.correctAnswer;

                animateStart();
            }, 270);
        }

    } catch (error) {
        handleLoader();
        alert('Uh Uh Something Went Wrong, It May Be Poor Connection or Delay In Response.       please try again. 😢');
    }
};

//////// UPDATE PROFILE NAME
dom.formName.addEventListener('input', updateName);


//////// GAME START AFTER INPUTS RECEIVED SUCCESFULLY
dom.form.addEventListener('submit', (e) => {
    e.preventDefault();
    processDataToStart();
});


/////  VALIDATE CURRENT ANSWER
const validateAnswer = () => {
        dom.optionBox.forEach(box => {
            box.addEventListener('click', (ev) => {
                isCorrect(state.questions.correctAnswer, box, ev);
            });
        });
};
validateAnswer();

///// LOAD NEXT QUESTION AFTER EVERY ANSWERED QUESTION
const nextQuestion =()=>{
    clearColors();
    addHover();
    let newQuestion = state.questions.loadQuestion();
    renderQuestion(newQuestion);
};
dom.gameBtn.addEventListener('click', nextQuestion);




//////// EXITING THE GAME
const exitGame = () => {
    reverseStartAnimation();
};
dom.hasEvent.btnExit.addEventListener('click', exitGame);

