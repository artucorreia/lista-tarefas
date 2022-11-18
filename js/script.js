const createAndOrganizeElements = (task) => {
    console.log(task)
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
    const btnEdit = window.document.createElement('button');
    btnEdit.className = 'btn btn-secondary';
    const btnDelete = window.document.createElement('button');
    btnDelete.className = 'btn btn-secondary';
    const iconCheck = window.document.createElement('i');
    iconCheck.className = 'fas fa-check';
    const iconEdit = window.document.createElement('i');
    iconEdit.className = 'fas fa-pencil';
    const iconDelete = window.document.createElement('i');
    iconDelete.className = 'fas fa-trash';
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
    return divRow;
};

// nova tarefa
var tasks = [];
const createTask = (t) => {
    return {
        'name': t,
        'status': false
    };
};
const divTasks = window.document.getElementById('tasks');
const createNewTask = window.document.getElementById('createNewTask');
createNewTask.addEventListener('click', () => {
    let newTasktxt = window.document.getElementById('newTask');
    let newTaskName = newTasktxt.value;
    const task = createTask(newTaskName); 
    tasks.push(task);
    tasks.forEach((task) => {
        divTasks.appendChild(createAndOrganizeElements(task));
    })
});
