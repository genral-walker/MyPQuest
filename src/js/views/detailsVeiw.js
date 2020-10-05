
import { domElements as dom, domClasslists as classes } from './base';


/*
*- Bring out overview and table
*/
/**
 * 1. if the overview-slide page is in display and anywhere in
 the page (except the ones which already have event listerners) is clicked,
  close the overview;

**/

let isOpen;

export const detailShow = () => {
        dom.details.classList.toggle(classes.detailShow);
        isOpen = true;
};

export const controlTable = () => {
    dom.detailsTable.classList.toggle(classes.tableShow);
    dom.detailsOverview.classList.toggle(classes.noShadow);
};

const secondClick = () => {
    document.addEventListener('click', (e) => {
        if (clicked && !(e.target.classList.contains(btn))) {
            console.log(e.target.classList.contains('details__highscores'));
            document.querySelector('.details').classList.remove('details-show');
            dom.detailsTable.classList.remove(classes.tableShow);
            dom.detailsOverview.classList.remove(classes.noShadow);

        }

    });
};


export const closeDetails = (e) => {
if (isOpen === true) {
    /////// IF THE TARGET EVENT DOES NOT HAVE AN EVENT LISTENER CLOSE THE SLIDE, ELSE THE EVENT SHOULD NOT TRIGGER THE BELOW- ANOther event should.
    if (!dom.details.classList.contains(classes.detailShow)) {
        dom.detailsTable.classList.remove(classes.tableShow);
        dom.detailsOverview.classList.remove(classes.noShadow);
  }
}
};
