// cria os elementos que vão conter as tasks completas
const elementsExcluded = task => {
    const divTask = window.document.createElement('div');
    divTask.innerHTML = task.name;
    return divTask;
}

// cria os elementos que vão conter as tasks deletadas
const elementsCompleted = task => {
    const divTask = window.document.createElement('div');
    divTask.innerHTML = task.name;
    return divTask;
}

const selectTask = () => { 
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].name == selectedDivTask.innerHTML) {
            return tasks[i];
        }
    }
};

const removeRow = () => {
    sectionTasks.removeChild(selectedRow);
};

const check = () => {
    removeRow();
    selectTask().status = true;
    let elementos = elementsCompleted(selectTask())
    sectionTasksCompleteds.appendChild(elementos)
};

const clearTaskText = () => selectedDivTask.innerText = '';

const inputEdition = text => {
    const input = window.document.createElement('input')
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'newEdition');
    input.setAttribute('value', text);
    return input;
}

const changeBtns = () => {

}

const edit = () => {
    // selectTask();
    // console.log(selectTask().name)
    // console.log('vai editar: ' + selectedDivTask.innerHTML);
    // console.log(inputEdition());
    let elemento = inputEdition(selectTask().name);
    clearTaskText();
    selectedDivTask.appendChild(elemento);
    changeBtns()
};

const exclude = () => {
    removeRow();
    selectTask().status = null;
    let elementos = elementsExcluded(selectTask());
    sectionTasksExcludeds.appendChild(elementos);
};

// direciona para check, edit ou exclude
const optionClass = {
    'fas fa-check':  () => check(),
    'fas fa-pencil': () => edit(),
    'fas fa-trash':  () => exclude(),
    'btn btn-secondary check':  () => check(),
    'btn btn-secondary edit':   () => edit(),
    'btn btn-secondary delete': () => exclude()
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
const options = event => {
    taskId = event.target.id;
    selectedDivTask = selectDivTask(taskId);
    selectedRow = selectRow(taskId);
    optionClass[event.target.className]();
};

const buttons = btns => btns.addEventListener('click', options);

const clearInput = txt => txt.value = '';

// cria id novos
let aux = 0;
const createId = () => {
    const i = 'id';
    aux++;
    return i + aux;
};

let id = '';
const elementsPrime = task => {
    id = createId();
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
    divRow.id = 'row' + id;
    const divColTask = window.document.createElement('div'); 
    divColTask.className = 'col';
    const divColBtns = window.document.createElement('div'); 
    divColBtns.className = 'col';
    const divTask = window.document.createElement('div'); 
    divTask.className = 'task';
    divTask.id = 'task' + id;
    const divGroupBtns = window.document.createElement('div'); 
    divGroupBtns.className = 'btn-group mr-2';
    divGroupBtns.ariaRoleDescription = 'group';
    divGroupBtns.ariaLabel = 'Segundo grupo';
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
const prime = () => {
    sectionTasks.hidden = false;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = true
};

const completed = () => {
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = false;
    sectionTasksExcludeds.hidden = true;
    btnClearAll.hidden = false
};

const excluded = () => {
    sectionTasks.hidden = true;
    sectionTasksCompleteds.hidden = true;
    sectionTasksExcludeds.hidden = false;
    btnClearAll.hidden = false
};

const optionsNavbar = {
    'prime':     () => prime(),
    'completed': () => completed(),
    'excluded':  () => excluded()
};

// botão limpar tudo
const btnClearAll = window.document.getElementById('clearAll');
btnClearAll.addEventListener('click', () => {
    let confirm = window.confirm('Deseja apagar todos os itens desta aba?')
    if (confirm) {
        if (!sectionTasksCompleteds.hidden) {
            sectionTasksCompleteds.innerHTML = '';
        } else {
            sectionTasksExcludeds.innerHTML = '';
        }
    }
});
btnClearAll.hidden = true

// abas navbar
const title = window.document.getElementById('title');
title.addEventListener('click', prime);

const sectionTasksCompleteds = window.document.getElementById('tasksCompleteds');
const sectionTasksExcludeds = window.document.getElementById('tasksExcludeds');
const btnPrime = window.document.getElementById('prime');
const btnCompleted = window.document.getElementById('completed');
const btnExcluded = window.document.getElementById('excluded');

const navbar = window.document.getElementById('navbarNav');
navbar.addEventListener('click', (event) => {
    if (event.target.id != 'navbarNav') {
        optionsNavbar[event.target.id]();
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
    prime();
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