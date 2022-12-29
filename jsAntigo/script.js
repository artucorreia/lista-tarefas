// cria os elementos que vão conter as tasks completas ou deletadas
const secondaryElements = task => {
    const divTask = window.document.createElement('div');
    divTask.className = 'div-secondary';
    divTask.innerHTML = task.name;
    return divTask;
};

const selectTask = () => { 
    for (let i = 0; i < tasks.length; i++) {
        if (selectedDivBtns.hidden) {
            if(tasks[i].name == checkpoint) {
                return tasks[i];
            }
        } else {
            if(tasks[i].name == selectedDivTask.innerHTML) {
                return tasks[i];
            }

        }
    }
};

const removeRow = () => sectionTasks.removeChild(selectedRow);

// marcar como feita
const check = () => {
    removeRow();
    selectTask().status = true;
    let elements = secondaryElements(selectTask());
    sectionTasksCompleteds.appendChild(elements);
};

// excluir task
const exclude = () => {
    removeRow();
    selectTask().status = null;
    let elements = secondaryElements(selectTask());
    sectionTasksExcludeds.appendChild(elements);
};

const changeHidden = btns => {
    elementsEdition.hidden = true;
    btns.hidden = false;
};

const cancelEdition = () => {
    open = false;
    contentEdit.contentEditable = false;
    contentEdit.innerHTML = checkpoint;
    changeHidden(selectedDivBtns);
};

const editNull = x => {
    if (x == '') {
        optionId['cancelEdition']();
        return true;
    } else {
        return false;
    }
};

const confirmEdition = () => {
    open = false;
    if (!editNull(contentEdit.innerHTML)) {
        selectTask().name = contentEdit.innerText;
        contentEdit.contentEditable = false;
        changeHidden(selectedDivBtns);
    }
};

const optionId = {
    'confirmEdition': () => confirmEdition(),
    'cancelEdition':  () => cancelEdition() 
};

const optionsEdit = event => optionId[event.target.id](); 

const btnsEdit = btns => btns.addEventListener('click', optionsEdit); 

let checkpoint = '';
const createCheckpoint = () => checkpoint = contentEdit.innerHTML;

const keyEdit = div => {
    div.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            document.getElementById('confirmEdition').click();
        }
    });
};

const elementsEdit = () => {
    const btns = window.document.createElement('div'); 
    btns.className = 'btn-group';
    btns.id = 'btnsEdit';
    btns.ariaRoleDescription = 'group';
    const btnConfirm = window.document.createElement('button'); 
    btnConfirm.className = 'btn btn-secondary';
    btnConfirm.id = 'confirmEdition';
    const btnCancel = window.document.createElement('button');
    btnCancel.className = 'btn btn-secondary';
    btnCancel.id = 'cancelEdition';
    const iconConfirm = window.document.createElement('i');
    iconConfirm.className = 'fas fa-check';
    iconConfirm.id = 'confirmEdition';
    const iconCancel = window.document.createElement('i');
    iconCancel.className = 'fas fa-xmark fa-marge';
    iconCancel.id = 'cancelEdition';
    btnConfirm.appendChild(iconConfirm);
    btnCancel.appendChild(iconCancel);
    btns.appendChild(btnConfirm);
    btns.appendChild(btnCancel);
    btnsEdit(btns);
    return btns;
};

const elementsEdition = elementsEdit();
let firstTime = true;
let before = '';
const openElements = () => {
    if (firstTime || selectedColBtns != before) {
        selectedColBtns.appendChild(elementsEdition);
    }
    elementsEdition.hidden = false;
    before = selectedColBtns; 
    firstTime = false;
};

const hiddenBtns = btns => btns.hidden = true;

const verificationEdit = x => {
    if (x) {
        return optionId['cancelEdition']();
    }
};

// editar task
let open = false;
let contentEdit = '';
const edit = () => {
    open = true
    hiddenBtns(selectedDivBtns);
    contentEdit = selectedDivTask;
    contentEdit.contentEditable = true
    contentEdit.focus();
    createCheckpoint();
    keyEdit(contentEdit);
    openElements();
};

// direciona para check, edit ou exclude
const optionClass = {
    'fas fa-check':  () => check(),
    'fas fa-trash':  () => exclude(),
    'fas fa-pencil': () => edit(),
    'btn btn-secondary check':  () => check(),
    'btn btn-secondary delete': () => exclude(),
    'btn btn-secondary edit':   () => edit()
};

// pega a div dos btns
const selectDivBtns = taskId => {
    let btns = window.document.getElementById('btns' + taskId);
    return btns;
};

const selectColBtns = taskId => {
    let col = window.document.getElementById('col' + taskId);
    return col;
};

// pega a row da task
const selectRow = taskId => {
    let row = window.document.getElementById('row' + taskId);
    return row;
};

// pega a task que vai ser verificada, editada ou deletada
const selectDivTask = taskId => {
    let task = window.document.getElementById('task' + taskId);
    return task;
};

// identifica função que o usuário quer executar 
let taskId = '';
let selectedDivTask = '';
let selectedRow = '';
let selectedDivBtns = '';
let selectedColBtns = '';
const options = event => {
    verificationEdit(open);
    taskId = event.target.id;
    selectedDivTask = selectDivTask(taskId);
    selectedRow = selectRow(taskId);
    selectedDivBtns = selectDivBtns(taskId);
    selectedColBtns = selectColBtns(taskId);
    optionClass[event.target.className]();
};

const buttons = btns => btns.addEventListener('click', options);

const clearInput = txt => txt.value = '';

// cria id novos
let aux = 0;
const createId = () => {
    aux++;
    return 'id' + aux;
};

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

let id = '';
const elementsPrime = task => {
    id = createId();
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
    divRow.id = 'row' + id;
    const divColTask = window.document.createElement('div'); 
    divColTask.className = 'col-7';
    const divColBtns = window.document.createElement('div'); 
    divColBtns.className = 'col-3';
    divColBtns.id = 'col' + id;
    responsive(divColBtns, widthViewport);
    const divTask = window.document.createElement('div'); 
    divTask.className = 'task';
    divTask.id = 'task' + id;
    const divGroupBtns = window.document.createElement('div'); 
    divGroupBtns.className = 'btn-group mr-2';
    divGroupBtns.ariaRoleDescription = 'group';
    divGroupBtns.id = 'btns' + id;
    const btnCheck = window.document.createElement('button');
    btnCheck.className = 'btn btn-secondary check';
    btnCheck.id = id;
    const btnEdit = window.document.createElement('button');
    btnEdit.className = 'btn btn-secondary edit';
    btnEdit. id = id;
    const btnDelete = window.document.createElement('button');
    btnDelete.className = 'btn btn-secondary delete';
    btnDelete.id = id;
    const iconCheck = window.document.createElement('i');
    iconCheck.className = 'fas fa-check';
    iconCheck.id = id;
    const iconEdit = window.document.createElement('i');
    iconEdit.className = 'fas fa-pencil';
    iconEdit.id = id;
    const iconDelete = window.document.createElement('i');
    iconDelete.className = 'fas fa-trash';
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
const AbaPrime = () => {
    sectionTasks.hidden = false;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = true;
};

const AbaCompleted = () => {
    // caso tenha uma edição ativa, vai ser cancelada
    optionId['cancelEdition']();
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = false;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = false;
};

const AbaExcluded = () => {
    // caso tenha uma edição ativa, vai ser cancelada
    optionId['cancelEdition']();
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = false;
    btnClearAll.hidden = false;
};

const optionsNavbar = {
    'prime':     () => AbaPrime(),
    'completed': () => AbaCompleted(),
    'excluded':  () => AbaExcluded()
};

// botão limpar tudo
const btnClearAll = window.document.getElementById('clearAll');
btnClearAll.addEventListener('click', () => {
    let confirm = window.confirm('Deseja apagar todos os itens desta aba?');
    if (confirm) {
        if (!sectionTasksCompleteds.hidden) {
            sectionTasksCompleteds.innerHTML = '';
        } else {
            sectionTasksExcludeds.innerHTML = '';
        }
    }
});
btnClearAll.hidden = true;

// abas navbar
const title = window.document.getElementById('title');
title.addEventListener('click', AbaPrime);

const sectionTasksCompleteds = window.document.getElementById('tasksCompleteds');
const sectionTasksExcludeds = window.document.getElementById('tasksExcludeds');
const btnPrime = window.document.getElementById('prime');
const btnCompleted = window.document.getElementById('completed');
const btnExcluded = window.document.getElementById('excluded');

const navbar = window.document.getElementById('navbarNav');
navbar.addEventListener('click', event => {
    const evento = event.target.id
    if (evento != 'navbarNav') {
        optionsNavbar[evento]();
    }
});

// nova task
let tasks = [];
const createTask = name => {
    return {
        'name': name,
        'status': false
    }
};

const sectionTasks = window.document.getElementById('tasks');
const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    AbaPrime();
    let newTaskTxt = window.document.getElementById('newTask');
    let newTaskName = newTaskTxt.value;
    if (newTaskName != '') {
        const task = createTask(newTaskName); 
        tasks.push(task);
        sectionTasks.appendChild(elementsPrime(task));
    } else {
        alert('Adicione uma tarefa');
    }
    clearInput(newTaskTxt);
});

// adicionando key(enter)
const keyEnter = window.document.getElementById('newTask');
newTask.addEventListener('keypress', event => {
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