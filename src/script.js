import TaskManager from "./class.js";
import tasks from "./tasks.js";
import elementsHTML from "./elements-html.js";
import options from "./options.js";
import section from "./sections.js";
import abaPrime from "./navbar.js";
import localstorage from './localstorage.js';
import clearAll from "./clear-all.js";

const manager = new TaskManager();

// direciona para check, edit ou exclude
const mainOptions = {
    check:  () => manager.checkTask(divTask, row),
    // edit:   () => options['edit'](divButtons, divTask),
    delete: () => manager.deleteTask(divTask, row)
};

// pega a row da task
const getRow = btns => btns.parentElement.parentElement;

// pega a div da task
const getDivTask = btns => btns.parentElement.previousElementSibling.firstElementChild;

// pega os elementos HTML
let row = '';
let divTask = '';
let divButtons = '';
const buttons = btns => btns.addEventListener('click', event => {
    options['verificationEdit']();
    divButtons = btns;
    divTask = getDivTask(btns);
    row = getRow(btns);
    mainOptions[event.target.dataset.name]();
});

// seta o event listener para o group buttons
// sempre que algum é gerado
const buttonsEventListener = statusTask => {
    if (statusTask == false) {
        buttons(
            section['tasks'].lastElementChild.lastElementChild.firstElementChild
        );
    }
};

const btnClearAll = window.document.getElementById('clearAll');
btnClearAll.addEventListener('click', clearAll);
btnClearAll.hidden = true;

const clearInput = txt => txt.value = '';

const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    abaPrime();
    options['verificationEdit']();
    let newTaskTxt = window.document.getElementById('newTask');
    let newTaskName = newTaskTxt.value;
    if (newTaskName.trim() != '') {
        const task = manager.addTask(newTaskName.trim());
        // console.log(task);
        // const task = tasks['createTask'](newTaskName.trim()); 
        tasks['tasks'].push(task[task.length - 1]);
        section['tasks'].appendChild(elementsHTML['prime'](task[task.length - 1]));
        buttonsEventListener(false);
        localstorage['add']();
    } else {
        alert('Adicione uma tarefa');
    }
    clearInput(newTaskTxt);
});

// key para adicionar tasks(enter)
const keyEnter = window.document.getElementById('newTask');
keyEnter.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        document.getElementById('createNewTask').click();
    }
});

// setando e exibindo localStorage
// ;(() => {
//     localstorage['set']();
//     localstorage['display'](buttonsEventListener);
//     abaPrime();
// })();