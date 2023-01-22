import tasks from "./tasks.js";
import elementsHTML from "./elements-html.js";
import options from "./options.js";
import section from "./sections.js";
import abaPrime from "./navbar.js";
import localstorage from './localstorage.js'

// direciona para check, edit ou exclude
const mainOptions = {
    'check':  () => options['check'](divTask, row),
    'edit':   () => options['edit'](divButtons, divTask),
    'delete': () => options['delete'](divTask, row)
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
    options['verificationEdit'](options['editActive']);
    divButtons = btns;
    divTask = getDivTask(btns);
    row = getRow(btns);
    mainOptions[event.target.dataset.name]();
});

// seta o event listener para o group buttons
// sempre que algum é gerado
const buttonsEventListener = statusTask => {
    if (statusTask == false) {
        buttons(section['tasks'].lastElementChild.lastElementChild.firstElementChild);
    }
};

const clearInput = txt => txt.value = '';

// remove as tasks com status undefined
const filterUndefined = () => {
    tasks['tasks'] = tasks['tasks'].filter((element) => {
        if (element.status !== undefined) {
            return element;
        }
    })
    localstorage['update']();
};

// muda o status da tarefa para undefined
const statusUndefined = trueOrNull => {
    tasks['tasks'].map((element) => {
        if (element.status == trueOrNull) {
            element.status = undefined;
        }
    })
};

// botão limpar tudo
const btnClearAll = window.document.getElementById('clearAll');
btnClearAll.addEventListener('click', () => {
    let confirm = window.confirm('Deseja apagar todos os itens desta aba?');
    if (confirm) {
        if (!section['completed'].hidden) {
            section['completed'].innerHTML = '';
            statusUndefined(true);
        } else {
            section['deleted'].innerHTML = '';
            statusUndefined(null);
        }
    }
    filterUndefined();
});
btnClearAll.hidden = true;

const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    abaPrime();
    options['verificationEdit'](options['editActive']);
    let newTaskTxt = window.document.getElementById('newTask');
    let newTaskName = newTaskTxt.value;
    if (newTaskName.trim() != '') {
        const task = tasks['createTask'](newTaskName.trim()); 
        tasks['tasks'].push(task);
        section['tasks'].appendChild(elementsHTML['prime'](task));
        buttonsEventListener(false);
        localstorage['add']();
    } else {
        alert('Adicione uma tarefa');
    }
    clearInput(newTaskTxt);
});

// adicionando key(enter)
const keyEnter = window.document.getElementById('newTask');
keyEnter.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        document.getElementById('createNewTask').click();
    }
});

// setando e exibindo localStorage
;(() => {
    localstorage['set']();
    localstorage['display'](buttonsEventListener);
    abaPrime();
})();