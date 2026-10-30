

let tasks = [];

const loadTasks = () => {
    const savedTasks = localStorage.getItem('savedTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);

        return tasks.filter(t => t.completed);
    }

    else {
        return [];
    }
}

  const historyList = document.getElementById('historyList');
  const historyTop = document.getElementById('historyTop');

    function updateList () {
        const completedTasks = loadTasks();

        historyList.innerHTML = '';

        if (completedTasks.length === 0) {
            historyTop.innerHTML = "You have no recently completed tasks";
            return
        }

        else {
            historyTop.innerHTML = "Your recently comleted tasks";

            completedTasks.forEach((task) => {
                const li = document.createElement('li');
                li.className = 'listItem';

                li.innerHTML = `
                    <div class="historyIconText">
                        <span class="historyIcon">👍</span>
                        <span class="historyText">${task.text}</span>
                    </div>
                     <span class="historyCompleted">Completed</span>
                `;
                historyList.appendChild(li);
            });
        }
    }

    updateList();

document.getElementById("year").textContent = new Date().getFullYear();

