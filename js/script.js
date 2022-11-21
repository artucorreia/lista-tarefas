const check = () => {
    console.log('check ok')
}

const edit = () => {
    console.log('edit ok')
}

const exclude = () => {
    console.log('exclude ok')
}

// direciona para check, edit, exclude
const optionClass = {
    'fas fa-check': () => check(),
    'fas fa-pencil': () => edit(),
    'fas fa-trash': () => exclude(),
    'btn btn-secondary check': () => check(),
    'btn btn-secondary edit': () => edit(),
    'btn btn-secondary delete': () => exclude()
};

// pega a task que vai ser verificada, editada ou deletada
const selectTask = taskId => {
    let task = window.document.getElementById('task' + taskId);
    console.log(task)
}

// pega tanto a função que o usuário quer executar 
let taskId = null;
const options = event => {
    taskId = event.target;
    selectTask(taskId);
    optionClass[event.target.className]()
};

const buttons = btns => btns.addEventListener('click', options);

const clearInput = txt => txt.value = '';

// cria id novos
let aux = 0;
const createId = () => {
    const i = 'id';
    aux++;
    return i + aux;
}

let id = '';
const createAndOrganizeElements = task => {
    id = createId();
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
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

// nova tarefa
var tasks = [];
const createTask = name => {
    return {
        'name': name,
        'status': false
    };
};

const divTasks = window.document.getElementById('tasks');
const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    let newTaskTxt = window.document.getElementById('newTask');
    let newTaskName = newTaskTxt.value;
    if (newTaskName != '') {
        const task = createTask(newTaskName); 
        tasks.push(task);
        divTasks.appendChild(createAndOrganizeElements(task));
    } else {
        alert('Adicione uma tarefa');
    };
    clearInput(newTaskTxt);
});

// adicionando key
const keyEnter = window.document.getElementById('newTask');
newTask.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        document.getElementById('createNewTask').click();
    };
});