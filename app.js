const STORAGE_KEY = "goblin-wrangler-tasks";

const starterTasks = [
  { id: crypto.randomUUID(), title: "Plan the week’s tiny victories", priority: "high", dueDate: "", status: "todo" },
  { id: crypto.randomUUID(), title: "Reply to the very important email", priority: "medium", dueDate: "", status: "doing" },
  { id: crypto.randomUUID(), title: "Drink water like a responsible wizard", priority: "low", dueDate: "", status: "done" },
];

let tasks = loadTasks();
let draggedTaskId = null;

const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const board = document.querySelector("#board");
const template = document.querySelector("#taskTemplate");
const saveStatus = document.querySelector("#saveStatus");

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterTasks;
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
    const moveButton = card.querySelector(".move-task");
    moveButton.textContent = task.status === "todo" ? "Start quest →" : task.status === "doing" ? "Mark done →" : "Reopen quest →";
    moveButton.addEventListener("click", () => moveTask(task.id));
    card.querySelector(".delete-task").addEventListener("click", () => deleteTask(task.id));
    article.addEventListener("dragstart", () => { draggedTaskId = task.id; article.classList.add("is-dragging"); });
    article.addEventListener("dragend", () => { draggedTaskId = null; article.classList.remove("is-dragging"); });
    document.querySelector(`[data-list="${task.status}"]`).appendChild(card);
  });

  ["todo", "doing", "done"].forEach((status) => {
    document.querySelector(`[data-count="${status}"]`).textContent = tasks.filter((task) => task.status === status).length;
  });
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  document.querySelector("#progressText").textContent = `${progress}% wrangled`;
  document.querySelector("#progressBar").style.width = `${progress}%`;
  document.querySelector("#taskCount").textContent = `${total} ${total === 1 ? "active quest" : "active quests"}`;
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
    status: "todo",
  });
  form.reset();
  document.querySelector("#taskPriority").value = "medium";
  saveTasks();
  render();
  titleInput.focus();
});

document.querySelector("#focusAddTask").addEventListener("click", () => titleInput.focus());
document.querySelector("#clearDone").addEventListener("click", () => {
  tasks = tasks.filter((task) => task.status !== "done");
  saveTasks();
  render();
});

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

render();
