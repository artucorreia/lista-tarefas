import functions from "./script.js";
import elementsHTML from "./elementsHTML.js";

// marcar como feita
const check = section => {
    let task = functions['getTask']();
    task.status = true;
    functions['removeRow']();
    let elements = elementsHTML['secondary'](task);
    section.appendChild(elements);
    functions['updateLocalStorage']();
    functions['abaPrime']();
};

// excluir task
const exclude = section => {
    let task = functions['getTask']();
    task.status = null;
    functions['removeRow']();
    let elements = elementsHTML['secondary'](task);
    section.appendChild(elements);
    functions['updateLocalStorage']();
    functions['abaPrime']();
};

export default {
    check: check,
    delete: exclude
}