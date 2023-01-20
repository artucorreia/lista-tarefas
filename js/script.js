import elementsHTML from "./elementsHTML.js";

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

// marcar como feita
const check = () => {
    let task = getTask();
    task.status = true;
    removeRow();
    let elements = elementsHTML['secondary'](task);
    sectionTasksCompleteds.appendChild(elements);
    updateLocalStorage();
    abaPrime();
};

// excluir task
const exclude = () => {
    let task = getTask();
    task.status = null;
    removeRow();
    let elements = elementsHTML['secondary'](task);
    sectionTasksExcludeds.appendChild(elements);
    updateLocalStorage();
    abaPrime();
};

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
    'check':  () => check(),
    'edit':   () => edit(),
    'delete': () => exclude()
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
    divButtons = window.document.getElementById(event.target.id);
    colBtns = getColBtns(divButtons);
    divTask = getDivTask(divButtons);
    row = getRow(divButtons);
    mainOptions[event.target.dataset.name]();
});

const clearInput = txt => txt.value = '';

const responsive = (div, width) => {
    switch (width) {
        case 0:
            div.style.textAlign = 'justify';
            break;
        case 1:
            div.style.textAlign = 'center';
            break;
        case 2:
            div.style.textAlign = 'right';
            break;
    }
};

// cria id novos
let auxId = 0;
const createId = () => {
    auxId++;
    return 'id' + auxId;
};

let id = '';
const elementsPrime = task => {
    id = createId();
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
    const divColTask = window.document.createElement('div'); 
    divColTask.className = 'col-7';
    const divColBtns = window.document.createElement('div'); 
    divColBtns.className = 'col-3';
    responsive(divColBtns, widthViewport);
    const divTask = window.document.createElement('div'); 
    divTask.className = 'task';
    const divGroupBtns = window.document.createElement('div'); 
    divGroupBtns.className = 'btn-group mr-2';
    divGroupBtns.ariaRoleDescription = 'group';
    divGroupBtns.id = id;
    const btnCheck = window.document.createElement('button');
    btnCheck.className = 'btn btn-secondary';
    btnCheck.setAttribute('data-name', 'check');
    btnCheck.id = id;
    const btnEdit = window.document.createElement('button');
    btnEdit.className = 'btn btn-secondary';
    btnEdit.setAttribute('data-name', 'edit');
    btnEdit. id = id;
    const btnDelete = window.document.createElement('button');
    btnDelete.className = 'btn btn-secondary';
    btnDelete.setAttribute('data-name', 'delete');
    btnDelete.id = id;
    const iconCheck = window.document.createElement('i');
    iconCheck.className = 'fas fa-check';
    iconCheck.setAttribute('data-name', 'check');
    iconCheck.id = id;
    const iconEdit = window.document.createElement('i');
    iconEdit.className = 'fas fa-pencil';
    iconEdit.setAttribute('data-name', 'edit');
    iconEdit.id = id;
    const iconDelete = window.document.createElement('i');
    iconDelete.className = 'fas fa-trash';
    iconDelete.setAttribute('data-name', 'delete');
    iconDelete.id = id;
    // organizando
    divRow.appendChild(divColTask);
    divColTask.appendChild(divTask);
    divTask.innerHTML = `${task.name}`;
    divRow.appendChild(divColBtns);
    divColBtns.appendChild(divGroupBtns);
    divGroupBtns.appendChild(btnCheck);
    btnCheck.appendChild(iconCheck);    
    divGroupBtns.appendChild(btnEdit);
    btnEdit.appendChild(iconEdit); 
    divGroupBtns.appendChild(btnDelete);
    btnDelete.appendChild(iconDelete);
    buttons(divGroupBtns);
    return divRow;
};

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
        sectionTasks.appendChild(elementsPrime(task));
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

// "responsividade" 0=gg 1=m 2=pp
let widthViewport = 0;
;(() => {
    if (window.screen.width <= 550) {
        widthViewport = 2;
    } else if (window.screen.width <= 640) {
        widthViewport = 1;
    }
})();

const optionsLocalStorage = {
    'false': (e) => sectionTasks.appendChild(elementsPrime(e)),
    'true':  (e) => sectionTasksCompleteds.appendChild(elementsHTML['secondary'](e)),
    'null':  (e) => sectionTasksExcludeds.appendChild(elementsHTML['secondary'](e))
};

// exibindo localStorage
;(() => {
    if (localStorage.tasks != '' && localStorage.tasks != null){
        tasks = JSON.parse(localStorage.tasks);
        tasks.map( (element) => optionsLocalStorage[element.status](element) );
    }
    abaPrime();
})();

// setando localStorage
;(() => {
    if (localStorage.tasks == null) {
        localStorage.setItem('tasks', '');
    }
})();