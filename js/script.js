import elementsHTML from "./elementsHTML.js";
import options from "./options.js";

// atualiza o localStorage
const updateLocalStorage = () => localStorage.tasks = JSON.stringify(tasks);

// pegar a task
let i = 0;
const getTask = () => { 
    let filter = [];
    filter = tasks.filter((element, indice) => {
        // se o botões estiverem escondido(está na edição)
        // se está na edição e o nome do elemento é igual ao do checkpoint
        // retorna o indice
        if ((divButtons.hidden) && (element.name == checkpointEdit)) {
            i = indice;
        } else if((element.name == divTask.innerText) && (element.status == false)) {     
            return element;
        }
    })
    return filter[0];
};

const removeRow = () => sectionTasks.removeChild(row);

const changeHidden = btns => {
    elementsEdition.hidden = true;
    btns.hidden = false;
};

const cancelEdition = () => {
    divTask.contentEditable = false;
    divTask.innerHTML = checkpointEdit;
    changeHidden(divButtons);
    editActive = false;
};

const editNull = text => {
    if (text.trim() == '') {
        editOptions['cancelEdition']();
        return true;
    } else {
        return false;
    }
};

const confirmEdition = () => {
    if (!editNull(divTask.innerText)) {
        getTask();
        tasks[i].name = divTask.innerText.trim();
        divTask.innerHTML = divTask.innerText.trim();
        divTask.contentEditable = false;
        changeHidden(divButtons);
        updateLocalStorage();
    }
    editActive = false;
};

const editOptions = {
    'confirmEdition': () => confirmEdition(),
    'cancelEdition':  () => cancelEdition() 
};

const optionsEdit = event => editOptions[event.target.dataset.name](); 

const btnsEdit = btns => btns.addEventListener('click', optionsEdit); 

const keyEdit = div => {
    div.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            document.getElementById('btnsEdit').firstChild.click();
        }
    });
};

const elementsEdition = elementsHTML['edit']();
let firstTime = true;
let before = '';
const openElements = () => {
    btnsEdit(elementsEdition);
    if (firstTime || colBtns != before) {
        colBtns.appendChild(elementsEdition);
    }
    elementsEdition.hidden = false;
    before = colBtns; 
    firstTime = false;
};

const verificationEdit = active => {
    if (active) {
        return editOptions['cancelEdition']();
    }
};

const hiddenButtons = btns => btns.hidden = true;

let checkpointEdit = '';
const createCheckpoint = () => checkpointEdit = divTask.innerText;

// editar task
let editActive = false;
const edit = () => {
    editActive = true
    createCheckpoint();
    hiddenButtons(divButtons);
    divTask.contentEditable = true;
    divTask.focus();
    keyEdit(divTask);
    openElements();
};

// direciona para check, edit ou exclude
const mainOptions = {
    'check':  () => options['check'](sectionTasksCompleteds),
    'edit':   () => edit(),
    'delete': () => options['delete'](sectionTasksExcludeds)
};

// pega a col dos btns
const getColBtns = btns => btns.parentElement;

// pega a row da task
const getRow = btns => btns.parentElement.parentElement;

// pega a div da task
const getDivTask = btns => btns.parentElement.previousElementSibling.firstElementChild;

// pega os elementos HTML
let row = '';
let colBtns = '';
let divTask = '';
let divButtons = '';
const buttons = btns => btns.addEventListener('click', event => {
    verificationEdit(editActive);
    divButtons = btns;
    colBtns = getColBtns(btns);
    divTask = getDivTask(btns);
    row = getRow(btns);
    mainOptions[event.target.dataset.name]();
});

// seta o event listener para o group buttons
// sempre que é gerado
const buttonsEventListener = statusTask => {
    if (statusTask == false) {
        buttons(sectionTasks.lastElementChild.lastElementChild.firstElementChild);
    }
};

const clearInput = txt => txt.value = '';

// configurações da navbar
const abaPrime = () => {
    sectionTasks.hidden = false;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = true;
};

const abaCompleted = () => {
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = false;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = false;
};

const abaExcluded = () => {
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = false;
    btnClearAll.hidden = false;
};

const optionsNavbar = {
    'prime':     () => abaPrime(),
    'completed': () => abaCompleted(),
    'excluded':  () => abaExcluded()
};

// remove as tasks com status undefined
const filterUndefined = () => {
    tasks = tasks.filter((element) => {
        if (element.status !== undefined) {
            return element;
        }
    })
    updateLocalStorage();
};

// muda o status da tarefa para undefined
const statusUndefined = trueOrNull => {
    tasks.map((element) => {
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
        if (!sectionTasksCompleteds.hidden) {
            sectionTasksCompleteds.innerHTML = '';
            statusUndefined(true);
        } else {
            sectionTasksExcludeds.innerHTML = '';
            statusUndefined(null);
        }
    }
    filterUndefined();
});
btnClearAll.hidden = true;

// abas navbar
const title = window.document.getElementById('title');
title.addEventListener('click', abaPrime);

const sectionTasksCompleteds = window.document.getElementById('tasksCompleteds');
const sectionTasksExcludeds = window.document.getElementById('tasksExcludeds');

const navbar = window.document.getElementById('navbarNav');
navbar.addEventListener('click', event => {
    const evento = event.target.id
    if (evento != 'navbarNav') {
        optionsNavbar[evento]();
    }
});

const addInLocalStorage = () => {
    localStorage.tasks = JSON.stringify(tasks);
};

// nova task
let tasks = [];
const createTask = name => {
    return {
        name: name,
        status: false
    }
};

const sectionTasks = window.document.getElementById('tasks');
const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    abaPrime();
    verificationEdit(editActive);
    let newTaskTxt = window.document.getElementById('newTask');
    let newTaskName = newTaskTxt.value;
    if (newTaskName.trim() != '') {
        const task = createTask(newTaskName.trim()); 
        tasks.push(task);
        sectionTasks.appendChild(elementsHTML['prime'](task));
        buttonsEventListener(false);
        addInLocalStorage();
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

const optionsLocalStorage = {
    'false': (e) => sectionTasks.appendChild(elementsHTML['prime'](e)),
    'true':  (e) => sectionTasksCompleteds.appendChild(elementsHTML['secondary'](e)),
    'null':  (e) => sectionTasksExcludeds.appendChild(elementsHTML['secondary'](e))
};

// exibindo localStorage
;(() => {
    if (localStorage.tasks != '' && localStorage.tasks != null){
        tasks = JSON.parse(localStorage.tasks);
        tasks.map((element) => {
            optionsLocalStorage[element.status](element);
            buttonsEventListener(element.status);
        });
    }
    abaPrime();
})();

// setando localStorage
;(() => {
    if (localStorage.tasks == null) {
        localStorage.setItem('tasks', '');
    }
})();

export default {
    getTask: getTask,
    updateLocalStorage: updateLocalStorage,
    abaPrime: abaPrime,
    removeRow: removeRow
};