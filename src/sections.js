const sectionTasks = 
    window.document.getElementById('tasks');
const sectionTasksDone = 
    window.document.getElementById('tasksDone');
const sectionTasksExcludeds = 
    window.document.getElementById('tasksExcludeds');

export default {
    tasks  : sectionTasks,
    done   : sectionTasksDone,
    deleted: sectionTasksExcludeds,
};