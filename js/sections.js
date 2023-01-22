const sectionTasks = window.document.getElementById('tasks');
const sectionTasksCompleteds = window.document.getElementById('tasksCompleteds');
const sectionTasksExcludeds = window.document.getElementById('tasksExcludeds');

export default {
    tasks: sectionTasks,
    completed: sectionTasksCompleteds,
    deleted: sectionTasksExcludeds,
};