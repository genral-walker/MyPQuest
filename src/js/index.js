
import Form from './models/Form';
import Questions from './models/Questions';
import Score from './models/Score';
import { domElements as dom, domClasslists, addClass, handleLoader, handleModal } from './views/base';
import { detailsToggle, tableToggle, closeDetails } from './views/detailsVeiw';
import { animatePageOnLoad, animateStart, reverseStartAnimation, reverseForEnd } from './views/gsap';
import { getInputs, clearInputs, updateName } from './views/formVeiw';
import { renderQuestionsAndAnswers as renderQuestion, clearColors, updatePercentage, addHover, removeHover } from './views/questionsView';
import { updateScore } from './views/scoreView';

/** Global state of the app
 * -
 */

let state = {};

//TESTERS
const hello = (e) => {
    console.log(e.target);
};


//////////GSAP ANIMATION ON PAGELOAD
window.addEventListener('load', animatePageOnLoad);

///// ADDS AN EVENT CLASS TO ALL ELEMENTS IN DOMCLASSLIST USED TO NULIFY DETAILS SLIDE ANIMATION. 
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

    let query = getInputs();
    state.form = new Form(query);

    try {
        handleLoader();

        let res = await state.form.submitQuery();

        state.questions = new Questions(res);
        state.questions.questionLength = parseFloat(dom.formNumbers.value);

        clearInputs();

        let questions = state.questions;
        if (questions) {
            let oneQuestion = state.questions.loadQuestion();
            handleLoader();

            setTimeout(() => {
                renderQuestion(oneQuestion);

                // THIS INITIALIZES THESE FUNCTIONS OUTSIDE OF THIS SCOPE
                state.questions.correctAnswer;
                state.score = new Score();

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
const isCorrect = (correctOption, box, ev) => {
    let reightOption = correctOption;
    if (reightOption) {
        if (box.lastElementChild.classList.contains(`bottom__text--${reightOption}`)) {
            removeHover();
            box.classList.add(domClasslists.corerct);
            updateScore(state.score.score);
        } else {
            removeHover();
            ev.target.classList.add(domClasslists.wrong);
            document.querySelector(`.bottom__answer--${reightOption}`).classList.add(domClasslists.corerct);

        }
    }

};

const validateAnswer = () => {
    let endReached;
    dom.optionBox.forEach(box => {
        box.addEventListener('click', (ev) => {
            isCorrect(state.questions.correctAnswer, box, ev);
            state.questions.answered = true;
            endReached = updatePercentage(state.questions.questionLength, state.questions.accumulator);

            // THIS CHECKS TO SEE IF THR RETURN VALUE ABOVE IS 100
            if (endReached === 100) {
                setTimeout(() => {
                    handleModal();
                }, 950);
            }
        });
    });

};
validateAnswer();

///// LOAD NEXT QUESTION AFTER EVERY ANSWERED QUESTION
const nextQuestion = () => {
    if (state.questions.answered) {
        clearColors();
        addHover();
        let newQuestion = state.questions.loadQuestion();
        renderQuestion(newQuestion);
        state.questions.answered = false;
    }

};
dom.gameBtn.addEventListener('click', nextQuestion);


//////// EXITING THE GAME
const exitGame = (value) => {
    let text, approved;

    if (state.questions) {

        if (value !== true) {
            text = 'Restarting Will Erase Your Progress, Do You Really Want To Restart?';
            approved = confirm(text);
        }

        if (approved || value === true) {
            let score = state.score.score = 0;
            updatePercentage();
            updateScore(score);
            reverseStartAnimation();
            clearColors();
            addHover();
            state.questions = undefined;
        }
    }

};
dom.hasEvent.btnExit.addEventListener('click', exitGame);
// FOR MODAL END BTN 

dom.modalBtn.addEventListener('click', () => {
    handleModal();
    setTimeout(() => {
        exitGame(true);
    }, 700);
});