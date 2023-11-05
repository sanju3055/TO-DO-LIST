const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const deleteTask = (taskElement) => {
  taskElement.remove();
  taskCount -= 1;
  displayCount(taskCount);
};

const editTask = (taskElement) => {
  const taskName = taskElement.querySelector(".taskname").innerText;
  newTaskInput.value = taskName;
  deleteTask(taskElement);
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `
    <div class="task">
      <input type="checkbox" class="task-check">
      <span class="taskname">${taskName}</span>
      <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = (e) => {
      const taskElement = e.target.closest(".task");
      if (taskElement) {
        deleteTask(taskElement);
      }
    };
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      const taskElement = e.target.closest(".task");
      if (taskElement) {
        editTask(taskElement);
      }
    };
  });

  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      const taskElement = checkBox.closest(".task");
      if (checkBox.checked) {
        taskElement.classList.add("completed");
        taskCount -= 1;
      } else {
        taskElement.classList.remove("completed");
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = document.querySelectorAll('.task').length;
  displayCount(taskCount);
  newTaskInput.value = "";
};
