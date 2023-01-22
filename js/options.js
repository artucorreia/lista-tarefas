import functions from "./script.js";
import elementsHTML from "./elements-html.js";

let i = 0;
const getTask = (divTask, divBtns) => { 
    let filter = [];
    filter = functions['tasks'].filter((element, indice) => {
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
const check = (section, divTask) => {
    let task = getTask(divTask, saveDivButtons);
    task.status = true;
    functions['removeRow']();
    let elements = elementsHTML['secondary'](task);
    section.appendChild(elements);
    functions['updateLocalStorage']();
    functions['abaPrime']();
};

// excluir task
const exclude = (section, divTask) => {
    let task = getTask(divTask, saveDivButtons);
    task.status = null;
    functions['removeRow']();
    let elements = elementsHTML['secondary'](task);
    section.appendChild(elements);
    functions['updateLocalStorage']();
    functions['abaPrime']();
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
        functions['tasks'][i].name = divTask.innerText.trim();
        divTask.innerHTML = divTask.innerText.trim();
        divTask.contentEditable = false;
        changeHidden(divBtns);
        functions['updateLocalStorage']();
    }
    editActive = false;
};

const editOptions = {
    'confirmEdition': () => confirmEdition(saveDivTask, saveDivButtons),
    'cancelEdition':  () => cancelEdition(saveDivTask, saveDivButtons) 
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
    editActive: editActive
}