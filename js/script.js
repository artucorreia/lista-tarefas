// check, edit, delete
const optionId = {
    'check': () => console.log('check ok'),
    'edit': () => console.log('edit ok'),
    'delete': () => console.log('exclude ok')
};

const options = event => optionId[event.target.id]();

const buttons = btns => btns.addEventListener('click', options);

const clearInput = txt => txt.value = '';

const createAndOrganizeElements = task => {
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
    const divColTask = window.document.createElement('div'); 
    divColTask.className = 'col';
    const divColBtns = window.document.createElement('div'); 
    divColBtns.className = 'col';
    const divTask = window.document.createElement('div'); 
    divTask.className = 'task';
    const divGroupBtns = window.document.createElement('div'); 
    divGroupBtns.className = 'btn-group mr-2';
    divGroupBtns.ariaRoleDescription = 'group';
    divGroupBtns.ariaLabel = 'Segundo grupo';
    const btnCheck = window.document.createElement('button');
    btnCheck.className = 'btn btn-secondary';
    btnCheck.id = 'check';
    const btnEdit = window.document.createElement('button');
    btnEdit.className = 'btn btn-secondary';
    btnEdit.id = 'edit';
    const btnDelete = window.document.createElement('button');
    btnDelete.className = 'btn btn-secondary';
    btnDelete.id = 'delete';
    const iconCheck = window.document.createElement('i');
    iconCheck.className = 'fas fa-check';
    iconCheck.id = 'check';
    const iconEdit = window.document.createElement('i');
    iconEdit.className = 'fas fa-pencil';
    iconEdit.id = 'edit';
    const iconDelete = window.document.createElement('i');
    iconDelete.className = 'fas fa-trash';
    iconDelete.id = 'delete';
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

// adicionando o enter
const keyEnter = window.document.getElementById('newTask');
newTask.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        document.getElementById('createNewTask').click();
    };
});