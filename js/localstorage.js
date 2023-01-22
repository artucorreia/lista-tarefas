import tasks from "./tasks.js";
import section from "./sections.js";
import elementsHTML from "./elements-html.js";
import abaPrime from "./navbar.js";
// import buttons from "./script.js";

// const buttonsEventListener = statusTask => {
//     if (statusTask == false) {
//         buttons(section['tasks'].lastElementChild.lastElementChild.firstElementChild);
//     }
// };

// atualiza o localStorage
const updateLocalStorage = () => localStorage.tasks = JSON.stringify(tasks['tasks']);

const addInLocalStorage = () => {
    localStorage.tasks = JSON.stringify(tasks['tasks']);
};

const optionsLocalStorage = {
    'false': (e) => section['tasks'].appendChild(elementsHTML['prime'](e)),
    'true':  (e) => section['completed'].appendChild(elementsHTML['secondary'](e)),
    'null':  (e) => section['deleted'].appendChild(elementsHTML['secondary'](e))
};

// exibindo localStorage
// ;(() => {
// })();

const displayLocalStorage = (buttonsEventListener) => {
    if (localStorage.tasks != '' && localStorage.tasks != null){
        tasks['tasks'] = JSON.parse(localStorage.tasks);
        tasks['tasks'].map((element) => {
            optionsLocalStorage[element.status](element);
            buttonsEventListener(element.status);
        });
    }
    abaPrime();
};

// ;(() => {
// })();

// setando localStorage
const setLocalStorage = () => {
    if (localStorage.tasks == null) {
        localStorage.setItem('tasks', '');
    }
};

export default {
    set: setLocalStorage,
    display: displayLocalStorage,
    add: addInLocalStorage,
    update: updateLocalStorage
};