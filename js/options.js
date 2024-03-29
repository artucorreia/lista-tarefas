// modulo para as opções principais

import tasks from "./tasks.js";
import elementsHTML from "./elements-html.js";
import section from "./sections.js";
import abaPrime from "./navbar.js";
import localstorage from "./localstorage.js";

const removeRow = row => section['tasks'].removeChild(row);

let i = 0;
const getTask = (divTask, divBtns) => { 
    let filter = [];
    filter = tasks['tasks'].filter((element, indice) => {
        // se o botões estiverem escondido(está na edição)
        // se está na edição e o nome do elemento é igual ao do checkpoint
        // retorna o indice
        if ((divBtns.hidden) && (element.name == checkpointEdit)) {
            i = indice;
        } else if((element.name == divTask.innerText) && (element.status == false)) {     
            return element;
        }
    })
    return filter[0];
};

// marcar como feita
const check = (divTask, row) => {
    let task = getTask(divTask, saveDivButtons);
    task.status = true;
    removeRow(row);
    let elements = elementsHTML['secondary'](task);
    section['completed'].appendChild(elements);
    localstorage['update']();
    abaPrime();
};

// excluir task
const exclude = (divTask, row) => {
    let task = getTask(divTask, saveDivButtons);
    task.status = null;
    removeRow(row);
    let elements = elementsHTML['secondary'](task);
    section['deleted'].appendChild(elements);
    localstorage['update']();
    abaPrime();
};

const changeHidden = btns => {
    elementsEdition.hidden = true;
    btns.hidden = false;
};

const cancelEdition = (divTask, divBtns) => {
    divTask.contentEditable = false;
    divTask.innerHTML = checkpointEdit;
    changeHidden(divBtns);
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

const confirmEdition = (divTask, divBtns) => {
    if (!editNull(divTask.innerText)) {
        getTask(saveDivTask, saveDivButtons);
        tasks['tasks'][i].name = divTask.innerText.trim();
        divTask.innerHTML = divTask.innerText.trim();
        divTask.contentEditable = false;
        changeHidden(divBtns);
        localstorage['update']();
    }
    editActive = false;
};

const editOptions = {
    confirmEdition: () => confirmEdition(saveDivTask, saveDivButtons),
    cancelEdition:  () => cancelEdition(saveDivTask, saveDivButtons) 
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
const openElements = colBtns => {
    btnsEdit(elementsEdition);
    if (firstTime || colBtns != before) {
        colBtns.appendChild(elementsEdition);
    }
    elementsEdition.hidden = false;
    before = colBtns; 
    firstTime = false;
};

const verificationEdit = () => {
    if (editActive) {
        return editOptions['cancelEdition']();
    }
};

const hiddenButtons = btns => btns.hidden = true;

let checkpointEdit = '';
const createCheckpoint = divTask => checkpointEdit = divTask.innerText;

// editar task
let editActive = false;
let saveDivTask = '';
let saveDivButtons = '';
const edit = (divBtns, divTask) => {
    saveDivTask = divTask;
    saveDivButtons = divBtns;
    editActive = true
    createCheckpoint(divTask);
    hiddenButtons(divBtns);
    divTask.contentEditable = true;
    divTask.focus();
    keyEdit(divTask);
    openElements(divBtns.parentElement);
};

export default {
    check: check,
    delete: exclude,
    edit: edit,
    verificationEdit: verificationEdit,
};