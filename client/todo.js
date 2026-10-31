


const addBtn = document.getElementById("addBtn");
const inputAlert = document.getElementById("inputAlert");
const progressBar = document.getElementById("progressBar");
const progressCount = document.getElementById("progressCount");


const handleSave = () => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));

}

const handleLoad = () => {
    const savedTasks = localStorage.getItem('savedTasks');


    if(savedTasks) {
        let loadedTasks = JSON.parse(savedTasks);
        const now = Date.now();
        const TwoDaysMs = 2000;//2 * 24 * 3600 * 1000 ;

        loadedTasks = loadedTasks.filter(t => {
            if(t.completed && t.completedAt) {
                return (now - t.completedAt) < TwoDaysMs ;
            }

            return true ;
        });
        return loadedTasks ;
    }

    return [] ;
}


const addToHistory = (task) => {
    const savedHistory = localStorage.getItem('savedHistory');
    let history = savedHistory ? JSON.parse(savedHistory) : [];
    
    if (!history.some(t => t.id === task.id)){
        history.push(task);
        localStorage.setItem('savedHistory', JSON.stringify(history));
    }

}

const removeFromHistory = (taskId) => {
    const savedHistory = localStorage.getItem('savedHistory');
    if(!savedHistory){ return; }

    let history = JSON.parse(savedHistory);
    history = history.filter(t => t.id !== taskId);
    localStorage.setItem('savedHistory', JSON.stringify(history));
}


let tasks = handleLoad();


function updateList () {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todoItem';
        li.innerHTML = `
            <div class="todoCheckText">
                 <input  type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="handleToggleTask(${index})">
                 <span class="taskText" style=${task.completed ? 'text-decoration: line-through; opacity : 0.6;' :'' }>${task.text}</span>
            </div>
            <div class="actionBtn">
                <span class="editBtn" onclick="handleEditTask(${index})">Edit</span> 
                <span class="deleteBtn" onclick="handleDeleteTask(${index})">Delete</span>
            </div>
        `
        todoList.appendChild(li);
    });  

    handleProgress();
}

const handleAddTask =  () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();


    if (text === ""){

        inputAlert.innerHTML = "Can't add an empty task";
        setTimeout(() => {inputAlert.innerHTML = "";},1500);
    }
    else if (editingIndex !== null) {
        tasks[editingIndex].text = text; 
        editingIndex = null;
    }

    else {

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    console.log("Added");
  }

    taskInput.value = "";

    handleSave();
    updateList();
}
               // Real add
 addBtn.addEventListener("click", handleAddTask);
          // Also real add but with enter btn
 taskInput.addEventListener("keypress", (e) =>{

    if(e.key === "Enter"){
        e.preventDefault();
        handleAddTask();
    }
 });

const handleToggleTask = (index) => { 
    tasks[index].completed = !tasks[index].completed;

    if(tasks[index].completed) {
        tasks[index].completedAt = Date.now();
        addToHistory(tasks[index]);
    }
    else {
        removeFromHistory(tasks[index].id);
        delete tasks[index].completedAt;
    }

    handleSave();
    updateList();  
}

let editingIndex = null;
const handleEditTask = (index) => {

    const taskInput = document.getElementById("taskInput");
    
    if(!tasks[index].completed){
        taskInput.value = tasks[index].text ;
     editingIndex = index;

     taskInput.focus();
    }


    /*
    const currentText = tasks[index].text;
    const newText = prompt("Edit your task:", currentText);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateList();
    }       */

    handleSave();
   updateList();
    }

const handleDeleteTask = (index) => {
    tasks.splice(index,1);

    handleSave();
    updateList();
}

const handleProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter(t =>  t.completed).length;

    progressCount.textContent = `${completed}/${total}`;

    const percentage = (completed/total)*100;
    progress.style.width = `${percentage}%`

}


updateList();

document.getElementById("year").textContent = new Date().getFullYear();

console.log(  'i am ' + Date.now());