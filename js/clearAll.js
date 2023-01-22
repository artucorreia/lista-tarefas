// modulo para as funções do botão clear All

import tasks from "./tasks.js";
import section from "./sections.js";
import localstorage from "./localstorage.js";

// remove as tasks com status undefined
const filterUndefined = () => {
    tasks['tasks'] = tasks['tasks'].filter((element) => {
        if (element.status !== undefined) {
            return element;
        }
    })
    localstorage['update']();
};

// muda o status da tarefa para undefined
const statusUndefined = trueOrNull => {
    tasks['tasks'].map((element) => {
        if (element.status == trueOrNull) {
            element.status = undefined;
        }
    })
};

// gerencia a opção de limpar tudo
const clearAll = () => {
    let confirm = window.confirm('Deseja apagar todos os itens desta aba?');
    if (confirm) {
        if (!section['completed'].hidden) {
            section['completed'].innerHTML = '';
            statusUndefined(true);
        } else {
            section['deleted'].innerHTML = '';
            statusUndefined(null);
        }
    }
    filterUndefined();
};

export default clearAll;