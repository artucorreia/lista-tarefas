// arquivo responsável pela navbar
import section from "./sections.js";

// configurações da navbar
const abaPrime = () => {
    section['tasks'].hidden   = false;
    section['done'].hidden    = true;
    section['deleted'].hidden = true;
    document.getElementById('clearAll').hidden = true;
};

const abaDone = () => {
    section['tasks'].hidden   = true;
    section['done'].hidden    = false;
    section['deleted'].hidden = true;
    document.getElementById('clearAll').hidden = false;
};

const abaExcluded = () => {
    section['tasks'].hidden   = true;
    section['done'].hidden    = true;
    section['deleted'].hidden = false;
    document.getElementById('clearAll').hidden = false;
};

const optionsNavbar = {
    prime   : () => abaPrime(),
    done    : () => abaDone(),
    excluded: () => abaExcluded()
};

// abas navbar
const title = window.document.getElementById('title');
title.addEventListener('click', abaPrime);

const navbar = window.document.getElementById('navbarNav');
navbar.addEventListener('click', event => {
    const id = event.target.id
    if (id != 'navbarNav') {
        optionsNavbar[id]();
    }
});

export default abaPrime;