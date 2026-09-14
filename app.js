const STORAGE_KEY = "goblin-wrangler-tasks";

const starterTasks = [
  { id: crypto.randomUUID(), title: "Plan the week’s tiny victories", priority: "high", dueDate: "", status: "todo", assignee: "Jen" },
  { id: crypto.randomUUID(), title: "Reply to the very important email", priority: "medium", dueDate: "", status: "doing", assignee: "Marsh" },
  { id: crypto.randomUUID(), title: "Drink water like a responsible wizard", priority: "low", dueDate: "", status: "done", assignee: "" },
];

let tasks = loadTasks();
let draggedTaskId = null;
let currentView = "camps";
let calendarDate = new Date();
calendarDate.setDate(1);

const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const board = document.querySelector("#board");
const template = document.querySelector("#taskTemplate");
const saveStatus = document.querySelector("#saveStatus");
const editDialog = document.querySelector("#editDialog");
const editTaskForm = document.querySelector("#editTaskForm");
let editingTaskId = null;

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const loaded = saved ? JSON.parse(saved) : starterTasks;
    return loaded.map((task) => ({ ...task, assignee: task.assignee || "" }));
  } catch {
    return starterTasks;
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  saveStatus.textContent = "Saved locally";
}

function formatDueDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  const overdue = date < new Date(new Date().toDateString());
  return { text: `${overdue ? "Overdue · " : "Due · "}${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`, overdue };
}

function render() {
  document.querySelectorAll(".task-list").forEach((list) => { list.replaceChildren(); });
  tasks.forEach((task) => {
    document.querySelector(`[data-list="${task.status}"]`).appendChild(createTaskCard(task));
    if (task.status === "done") {
      document.querySelector("#completedList").appendChild(createTaskCard(task));
    }
  });

  ["todo", "doing", "done"].forEach((status) => {
    document.querySelector(`[data-count="${status}"]`).textContent = tasks.filter((task) => task.status === status).length;
  });
  document.querySelector("#completedCount").textContent = tasks.filter((task) => task.status === "done").length;
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  document.querySelector("#progressText").textContent = `${progress}% wrangled`;
  document.querySelector("#progressBar").style.width = `${progress}%`;
  document.querySelector("#taskCount").textContent = `${total} ${total === 1 ? "active quest" : "active quests"}`;
  renderCalendar();
}

function createTaskCard(task) {
    const card = template.content.cloneNode(true);
    const article = card.querySelector(".task-card");
    const priority = card.querySelector(".priority-pill");
    const due = formatDueDate(task.dueDate);
    article.dataset.id = task.id;
    priority.textContent = task.priority;
    priority.classList.add(`priority-${task.priority}`);
    card.querySelector(".task-title").textContent = task.title;
    card.querySelector(".task-due").textContent = due.text || "No deadline · plenty of time";
    card.querySelector(".task-due").classList.toggle("overdue", due.overdue);
    card.querySelector(".task-assignee").textContent = task.assignee ? `Assigned to ${task.assignee}` : "Unassigned";
    const moveButton = card.querySelector(".move-task");
    moveButton.textContent = task.status === "todo" ? "Start quest →" : task.status === "doing" ? "Mark done →" : "Reopen quest →";
    moveButton.addEventListener("click", () => moveTask(task.id));
    card.querySelector(".delete-task").addEventListener("click", () => deleteTask(task.id));
    article.addEventListener("dragstart", () => { draggedTaskId = task.id; article.classList.add("is-dragging"); });
    article.addEventListener("dragend", () => { draggedTaskId = null; article.classList.remove("is-dragging"); });
    return card;
}

function moveTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  task.status = task.status === "todo" ? "doing" : task.status === "doing" ? "done" : "todo";
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  tasks.unshift({
    id: crypto.randomUUID(),
    title: data.get("title").trim(),
    priority: data.get("priority"),
    dueDate: data.get("dueDate"),
    assignee: data.get("assignee"),
    status: "todo",
  });
  form.reset();
  document.querySelector("#taskPriority").value = "medium";
  saveTasks();
  render();
  titleInput.focus();
});

document.querySelector("#focusAddTask").addEventListener("click", () => titleInput.focus());
document.querySelectorAll(".camp").forEach((camp) => {
  camp.addEventListener("dragover", (event) => { event.preventDefault(); camp.classList.add("is-over"); });
  camp.addEventListener("dragleave", () => camp.classList.remove("is-over"));
  camp.addEventListener("drop", (event) => {
    event.preventDefault();
    camp.classList.remove("is-over");
    const task = tasks.find((item) => item.id === draggedTaskId);
    if (task) { task.status = camp.dataset.status; saveTasks(); render(); }
  });
});

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  document.querySelector("#calendarTitle").textContent = calendarDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const grid = document.querySelector("#calendarGrid");
  grid.replaceChildren();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = dateKey(new Date());
  for (let index = 0; index < firstDay + daysInMonth; index += 1) {
    const day = index - firstDay + 1;
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    if (day < 1) {
      cell.classList.add("calendar-day-empty");
    } else {
      const date = new Date(year, month, day);
      const key = dateKey(date);
      if (key === todayKey) cell.classList.add("is-today");
      cell.addEventListener("dragover", (event) => {
        event.preventDefault();
        cell.classList.add("is-drop-target");
      });
      cell.addEventListener("dragleave", () => cell.classList.remove("is-drop-target"));
      cell.addEventListener("drop", (event) => {
        event.preventDefault();
        cell.classList.remove("is-drop-target");
        const taskId = event.dataTransfer.getData("text/plain") || draggedTaskId;
        const task = tasks.find((item) => item.id === taskId);
        if (!task || task.dueDate === key) return;
        task.dueDate = key;
        draggedTaskId = null;
        saveTasks();
        render();
      });
      const number = document.createElement("strong");
      number.textContent = day;
      cell.appendChild(number);
      tasks.filter((task) => task.dueDate === key).forEach((task) => {
        const item = document.createElement("div");
        item.className = `calendar-task priority-${task.priority}`;
        item.textContent = `${task.assignee ? `${task.assignee}: ` : ""}${task.title}`;
        item.title = `${task.title}${task.assignee ? ` · ${task.assignee}` : ""}`;
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.addEventListener("click", () => openEditDialog(task.id));
        item.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openEditDialog(task.id);
          }
        });
        item.draggable = true;
        item.dataset.id = task.id;
        item.addEventListener("dragstart", (event) => {
          draggedTaskId = task.id;
          event.dataTransfer.setData("text/plain", task.id);
          event.dataTransfer.effectAllowed = "move";
          item.classList.add("is-dragging");
        });
        item.addEventListener("dragend", () => {
          draggedTaskId = null;
          item.classList.remove("is-dragging");
        });
        cell.appendChild(item);
      });
    }
    grid.appendChild(cell);
  }

  const undated = tasks.filter((task) => !task.dueDate);
  const undatedContainer = document.querySelector("#undatedQuests");
  undatedContainer.replaceChildren();
  if (undated.length) {
    const heading = document.createElement("h4");
    heading.textContent = "Unscheduled quests";
    undatedContainer.appendChild(heading);
    undated.forEach((task) => {
      const item = document.createElement("span");
      item.textContent = `${task.assignee ? `${task.assignee}: ` : ""}${task.title}`;
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.addEventListener("click", () => openEditDialog(task.id));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEditDialog(task.id);
        }
      });
      item.draggable = true;
      item.dataset.id = task.id;
      item.addEventListener("dragstart", (event) => {
        draggedTaskId = task.id;
        event.dataTransfer.setData("text/plain", task.id);
        event.dataTransfer.effectAllowed = "move";
        item.classList.add("is-dragging");
      });
      item.addEventListener("dragend", () => {
        draggedTaskId = null;
        item.classList.remove("is-dragging");
      });
      undatedContainer.appendChild(item);
    });
  }

  function openEditDialog(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    editingTaskId = id;
    editTaskForm.elements.title.value = task.title;
    editTaskForm.elements.priority.value = task.priority;
    editTaskForm.elements.dueDate.value = task.dueDate;
    editTaskForm.elements.assignee.value = task.assignee;
    editTaskForm.elements.status.value = task.status;
    editDialog.showModal();
    editTaskForm.elements.title.focus();
  }

  function closeEditDialog() {
    editingTaskId = null;
    editDialog.close();
  }

  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = tasks.find((item) => item.id === editingTaskId);
    if (!task) {
      closeEditDialog();
      return;
    }
    const data = new FormData(editTaskForm);
    task.title = data.get("title").trim();
    task.priority = data.get("priority");
    task.dueDate = data.get("dueDate");
    task.assignee = data.get("assignee");
    task.status = data.get("status");
    saveTasks();
    closeEditDialog();
    render();
  });
  document.querySelector("#closeEditDialog").addEventListener("click", closeEditDialog);
  document.querySelector("#cancelEdit").addEventListener("click", closeEditDialog);
}

document.querySelector("#boardView").addEventListener("click", () => {
  setView("camps");
});
document.querySelector("#calendarView").addEventListener("click", () => {
  setView("calendar");
  renderCalendar();
});
document.querySelector("#completedView").addEventListener("click", () => setView("completed"));

function setView(view) {
  currentView = view;
  const views = {
    camps: document.querySelector("#board"),
    calendar: document.querySelector("#calendarPanel"),
    completed: document.querySelector("#completedPanel"),
  };
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== view;
  });
  document.querySelectorAll(".view-button").forEach((button) => {
    const active = button.id === `${view === "camps" ? "board" : view}View`;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
document.querySelector("#previousMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});
document.querySelector("#nextMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});

render();
setView(currentView);
