import elementsHTML from "./elements-html.js";
import section from "./sections.js";
import abaPrime from "./navbar.js";

class Task {
    constructor(name) {
        this.name   = name;
        this.status = false;
    }
};

class TaskManager {
    constructor () {
        this.tasks = [];
    }

    viewInConsole() {console.log(this.getTasks())}

    get tasks() {return [...this.tasks]}
    
    addTask(name) {
        this.tasks.push(new Task(name));
        return this.tasks;
    }
    
    getTask(divTask) {
        let task = 
            this.tasks.filter((element) => {
                if((element.name == divTask.innerText) && (element.status == false)) {     
                    return element;
                }
            });
        return task[0];
    }

    changeSection(row, task, doneOrDeleted) {
        section['tasks'].removeChild(row);
        let elements = elementsHTML['secondary'](task);
        section[doneOrDeleted].appendChild(elements);
        // localstorage['update']();
        abaPrime();
    }

    checkTask(divTask, row) {
        const task = this.getTask(divTask);
        task.status = true;
        this.changeSection(row, task, 'done');
        // console.log(tasks);
        this.viewInConsole();
    }

    deleteTask(divTask, row) {
        const task = this.getTask(divTask);
        task.status = null;
        this.changeSection(row, task, 'deleted');
        this.viewInConsole();
    }   

    editTask() {

    }
};

export default TaskManager;