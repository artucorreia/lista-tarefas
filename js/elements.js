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

// arquivo para os elementos HTML
// que são criado durante a execução
export default {
    secondary: secondaryElements,
    edit: elementsEdit
};