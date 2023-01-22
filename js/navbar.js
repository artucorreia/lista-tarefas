// arquivo responsável pela navbar
import section from "./sections.js";

// configurações da navbar
const abaPrime = () => {
    section['tasks'].hidden = false;
    section['completed'].hidden = true;
    section['deleted'].hidden = true;
    document.getElementById('clearAll').hidden = true;
};

const abaCompleted = () => {
    section['tasks'].hidden = true;
    section['completed'].hidden = false;
    section['deleted'].hidden = true;
    document.getElementById('clearAll').hidden = false;
};

const abaExcluded = () => {
    section['tasks'].hidden = true;
    section['completed'].hidden = true;
    section['deleted'].hidden = false;
    document.getElementById('clearAll').hidden = false;
};

const optionsNavbar = {
    prime:     () => abaPrime(),
    completed: () => abaCompleted(),
    excluded:  () => abaExcluded()
};

// abas navbar
const title = window.document.getElementById('title');
title.addEventListener('click', abaPrime);

const navbar = window.document.getElementById('navbarNav');
navbar.addEventListener('click', event => {
    const evento = event.target.id
    if (evento != 'navbarNav') {
        optionsNavbar[evento]();
    }
});

export default abaPrime;