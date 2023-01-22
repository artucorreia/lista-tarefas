// nova task
let tasks = [];
const createTask = name => {
    return {
        name: name,
        status: false
    }
};

export default {
    tasks: tasks,
    createTask: createTask
};