// arquivo para os elementos HTML
// que são criado durante a execução

import responsive from "./responsive.js";

// cria os elementos que vão conter as tasks completas ou deletadas
const secondaryElements = task => {
    const div = window.document.createElement('div');
    div.className = 'div-secondary';
    div.innerHTML = task.name;
    return div;
};

// cria o grupo de botões para edição
const elementsEdit = () => {
    const btns = window.document.createElement('div'); 
    btns.className = 'btn-group';
    btns.id = 'btnsEdit';
    btns.ariaRoleDescription = 'group';
    const btnConfirm = window.document.createElement('button'); 
    btnConfirm.className = 'btn btn-secondary';
    btnConfirm.setAttribute('data-name', 'confirmEdition');
    const btnCancel = window.document.createElement('button');
    btnCancel.className = 'btn btn-secondary';
    btnCancel.setAttribute('data-name', 'cancelEdition');
    const iconConfirm = window.document.createElement('i');
    iconConfirm.className = 'fas fa-check';
    iconConfirm.setAttribute('data-name', 'confirmEdition');
    const iconCancel = window.document.createElement('i');
    iconCancel.className = 'fas fa-xmark fa-marge';
    iconCancel.setAttribute('data-name', 'cancelEdition');
    btnConfirm.appendChild(iconConfirm);
    btnCancel.appendChild(iconCancel);
    btns.appendChild(btnConfirm);
    btns.appendChild(btnCancel);
    return btns;
};

// cria os elementos principais
// para as tasks
const elementsPrime = task => {
    // criando 
    const divRow = window.document.createElement('div'); 
    divRow.className = 'row';
    const divColTask = window.document.createElement('div'); 
    divColTask.className = 'col-7';
    const divColBtns = window.document.createElement('div'); 
    divColBtns.className = 'col-3';
    responsive(divColBtns);
    const divTask = window.document.createElement('div'); 
    divTask.className = 'task';
    const divGroupBtns = window.document.createElement('div'); 
    divGroupBtns.className = 'btn-group mr-2';
    divGroupBtns.ariaRoleDescription = 'group';
    const btnCheck = window.document.createElement('button');
    btnCheck.className = 'btn btn-secondary';
    btnCheck.setAttribute('data-name', 'check');
    const btnEdit = window.document.createElement('button');
    btnEdit.className = 'btn btn-secondary';
    btnEdit.setAttribute('data-name', 'edit');
    const btnDelete = window.document.createElement('button');
    btnDelete.className = 'btn btn-secondary';
    btnDelete.setAttribute('data-name', 'delete');
    const iconCheck = window.document.createElement('i');
    iconCheck.className = 'fas fa-check';
    iconCheck.setAttribute('data-name', 'check');
    const iconEdit = window.document.createElement('i');
    iconEdit.className = 'fas fa-pencil';
    iconEdit.setAttribute('data-name', 'edit');
    const iconDelete = window.document.createElement('i');
    iconDelete.className = 'fas fa-trash';
    iconDelete.setAttribute('data-name', 'delete');
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
    return divRow;
};

export default {
    prime: elementsPrime,
    secondary: secondaryElements,
    edit: elementsEdit
};