

let history = [];

const loadHistory = () => {
    const savedHistory = localStorage.getItem('savedHistory');

    if (savedHistory) {
        history = JSON.parse(savedHistory);
        const now = Date.now();
        const ThirtyDaysMs = 30 * 24 * 3600 * 1000;

        history = history.filter(t => 
            (now - t.completedAt) < ThirtyDaysMs
        );
         return history;
    }
       return [];
}

  const historyList = document.getElementById('historyList');
  const historyTop = document.getElementById('historyTop');

    function updateList () {
        const completedTasks = loadHistory();

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

