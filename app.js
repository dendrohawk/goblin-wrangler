const STORAGE_KEY = "goblin-wrangler-tasks";
const CATEGORY_STORAGE_KEY = "goblin-wrangler-categories";
const STATS_STORAGE_KEY = "goblin-wrangler-stats";

const starterCategories = [
  { id: "books", name: "Books", color: "#d0b968" },
  { id: "podcasts", name: "Podcasts", color: "#d58b4d" },
  { id: "videos", name: "Videos", color: "#8ebf78" },
];
const starterTasks = [
  { id: crypto.randomUUID(), title: "Plan the week’s tiny victories", priority: "high", dueDate: "", status: "todo", assignee: "Jen", category: "books" },
  { id: crypto.randomUUID(), title: "Reply to the very important email", priority: "medium", dueDate: "", status: "doing", assignee: "Marsh", category: "podcasts" },
  { id: crypto.randomUUID(), title: "Drink water like a responsible wizard", priority: "low", dueDate: "", status: "done", assignee: "", category: "videos", completedAt: new Date().toISOString() },
];

const goblinAdvice = [
  "Go get 'em, tiny task at a time.",
  "A quest on the board is a quest halfway wrangled.",
  "Even the mightiest goblin starts with one small step.",
  "Future you is already cheering from the finish line.",
  "Your next victory is hiding inside a very manageable task.",
  "Make a little progress, then make a little more.",
  "The best quest is the one you can actually start.",
  "Beware the fog of too many tabs. Pick one quest.",
  "A tidy camp makes for a brave adventurer.",
  "You do not need a perfect plan to begin.",
  "Goblin rule number one: write it down before it runs away.",
  "Small steps still leave very impressive footprints.",
  "Today is a good day to defeat one tiny dragon.",
  "Your task list believes in you, probably.",
  "Turn that idea into a quest before it gets cheeky.",
  "Done is a delightful place to visit.",
  "One finished task makes room for one exciting idea.",
  "Give your attention to the quest in front of you.",
  "Progress is progress, even when it wears mismatched socks.",
  "A deadline is less scary when it has a plan.",
  "Your future self would like a little help today.",
  "The goblins recommend starting with the easiest win.",
  "Make the next step so small it cannot hide.",
  "A brave goblin asks for help before the boss battle.",
  "You can do hard things and also take snack breaks.",
  "A little structure gives big ideas somewhere to grow.",
  "Do not let a blank page win. Give it one sentence.",
  "Every great project begins as a slightly suspicious idea.",
  "Your creative party is stronger when everyone knows the quest.",
  "The calendar is a map, not a monster.",
  "Keep the main quest visible and the side quests nearby.",
  "If it feels huge, split it into smaller goblins.",
  "One clear next action beats ten vague intentions.",
  "Today’s tiny win can become tomorrow’s momentum.",
  "Leave a helpful trail for the person who picks this up next.",
  "A good task has a verb, a target, and a little hope.",
  "Your ideas deserve a place to land.",
  "The goblin drumbeat says: start, save, celebrate.",
  "Do not wait for inspiration. Invite it with a first step.",
  "A rough draft is a door, not a failure.",
  "Keep going; the boring middle is still part of the adventure.",
  "Make room for the work that makes you sparkle.",
  "Your audience is waiting for something only you can make.",
  "A finished episode is made of many tiny recordings.",
  "A book is built one honest page at a time.",
  "A short video can carry a very big idea.",
  "The best content plan leaves room for surprise.",
  "Capture the idea now; polish it when it is safe.",
  "Your creative backlog is a treasure hoard, not a guilt pile.",
  "One good hook can open a whole story.",
  "A kind deadline helps the team do brave work.",
  "Name the next action and the fog will move aside.",
  "The right category makes a busy board feel friendlier.",
  "A task with an owner knows where to go.",
  "Share context generously; it saves everyone a little wandering.",
  "The team goblin is happiest when expectations are clear.",
  "A quick check-in can prevent a very elaborate detour.",
  "Celebrate the handoff, not just the final boss.",
  "Good systems make creativity easier, not smaller.",
  "Automation is a helpful goblin, not a replacement for judgment.",
  "If you repeat it twice, it may deserve a checklist.",
  "Make the process visible and the bottleneck will introduce itself.",
  "A useful dashboard answers a question, not every question.",
  "Measure what helps you decide what to do next.",
  "Numbers are clues wearing tiny business hats.",
  "A trend is more useful than a single dramatic day.",
  "The best metric is one that changes your next move.",
  "Leave a note for future-you; future-you has enough surprises.",
  "A little cleanup today prevents a large goblin nest tomorrow.",
  "The delete key is also a productivity tool.",
  "Not every idea needs to become a quest today.",
  "Protect your deep-work time like it is guarded treasure.",
  "A short break can return a missing idea.",
  "Hydrate, stretch, then defeat the next quest.",
  "Rest is part of the production schedule.",
  "Your brain is a creative collaborator, not a machine.",
  "The most productive plan includes a stopping point.",
  "A calm pace can still take you somewhere wonderful.",
  "One honest priority is better than twelve pretend priorities.",
  "Ask: what would make today feel meaningfully complete?",
  "The quest board is here to serve you, not judge you.",
  "Move a task when reality changes; that is strategy, not failure.",
  "A delayed quest is information for the next plan.",
  "Make the system fit the work, not the other way around.",
  "You are allowed to revise the quest.",
  "A good workflow is a conversation with reality.",
  "Keep experimenting until the process feels like yours.",
  "The goblin guild applauds useful imperfection.",
  "There is no shame in making the next step smaller.",
  "Your small business is built from many brave little choices.",
  "A clear offer makes it easier for the right people to say yes.",
  "Make something helpful, then tell people it exists.",
  "Your archive is evidence of what you can finish.",
  "Past victories are fuel, not a measuring stick.",
  "The next chapter does not need to look like the last one.",
  "Your team brings more magic when their work is visible.",
  "Build the tool you wish you had this morning.",
  "A useful improvement is worth more than a fancy distraction.",
  "Keep the quest moving, even if the route changes.",
  "Today’s goblin forecast: high chance of getting something done."
];

const goblinStyles = [
  { skin: "#789b58", shirt: "#d58b4d", hat: "#d0b968", eyes: "#152d22" },
  { skin: "#9dbb72", shirt: "#527d48", hat: "#d58b4d", eyes: "#152d22" },
  { skin: "#527d48", shirt: "#d0b968", hat: "#234937", eyes: "#ead68a" },
  { skin: "#b7a66a", shirt: "#8b6fb3", hat: "#527d48", eyes: "#152d22" },
  { skin: "#658c78", shirt: "#c45555", hat: "#ead68a", eyes: "#152d22" },
  { skin: "#b18b62", shirt: "#9dbb72", hat: "#806b39", eyes: "#152d22" },
  { skin: "#6f9a8d", shirt: "#d58b4d", hat: "#234937", eyes: "#ead68a" },
  { skin: "#a58d5f", shirt: "#527d48", hat: "#d0b968", eyes: "#152d22" },
];
const goblinAccessories = ["leaf", "book", "mug", "star", "pencil", "flower", "key", "none"];
const goblinPets = ["cat", "bird", "frog", "mouse", "none", "none", "none", "none"];

function createGoblinIllustration() {
  const style = goblinStyles[Math.floor(Math.random() * goblinStyles.length)];
  const accessory = goblinAccessories[Math.floor(Math.random() * goblinAccessories.length)];
  const pet = goblinPets[Math.floor(Math.random() * goblinPets.length)];
  const accessoryShapes = {
    leaf: `<path d="M75 83c-9-10-4-18 7-19 2 10 0 16-7 19Z" fill="${style.hat}"/><path d="m75 82 6-14" stroke="#152d22" stroke-width="2"/>`,
    book: `<rect x="66" y="76" width="19" height="13" rx="2" fill="${style.hat}" transform="rotate(-8 66 76)"/><path d="m76 75 2 14" stroke="#152d22" stroke-width="1.5"/>`,
    mug: `<path d="M69 78h15v11H70z" fill="${style.hat}"/><path d="M84 81c8-2 8 7 0 6" fill="none" stroke="${style.hat}" stroke-width="3"/>`,
    star: `<path d="m76 75 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z" fill="${style.hat}"/>`,
    pencil: `<path d="m69 91 13-18 4 3-13 18Z" fill="${style.hat}"/><path d="m69 91 4-1-2-3Z" fill="#ead68a"/>`,
    flower: `<path d="M76 92V77" stroke="#9dbb72" stroke-width="2"/><circle cx="76" cy="75" r="5" fill="${style.hat}"/><circle cx="76" cy="75" r="2" fill="#ead68a"/>`,
    key: `<circle cx="72" cy="81" r="5" fill="none" stroke="${style.hat}" stroke-width="3"/><path d="m76 85 10 8m-4-3 3-3" stroke="${style.hat}" stroke-width="3"/>`,
    none: "",
  };
  const petShapes = {
    cat: `<path d="M19 91v-9l5-5 8 1 5 7v8Z" fill="${style.hat}"/><path d="m23 78-2-7 7 5m5 0 5-5-1 9" fill="${style.hat}"/><circle cx="27" cy="83" r="1.5" fill="#152d22"/><circle cx="34" cy="83" r="1.5" fill="#152d22"/>`,
    bird: `<ellipse cx="25" cy="84" rx="10" ry="7" fill="${style.hat}"/><circle cx="31" cy="78" r="6" fill="${style.hat}"/><path d="m36 79 5 2-5 2" fill="#d58b4d"/><circle cx="32" cy="77" r="1.5" fill="#152d22"/>`,
    frog: `<ellipse cx="28" cy="87" rx="13" ry="8" fill="${style.hat}"/><circle cx="22" cy="79" r="5" fill="${style.hat}"/><circle cx="34" cy="79" r="5" fill="${style.hat}"/><circle cx="22" cy="79" r="2" fill="#152d22"/><circle cx="34" cy="79" r="2" fill="#152d22"/>`,
    mouse: `<ellipse cx="27" cy="86" rx="11" ry="7" fill="${style.hat}"/><circle cx="21" cy="80" r="4" fill="${style.hat}"/><circle cx="33" cy="80" r="4" fill="${style.hat}"/><path d="M17 87c-8 5-7 10 0 9" fill="none" stroke="${style.hat}" stroke-width="2"/>`,
    none: "",
  };
  return `<svg viewBox="0 0 110 110" role="img" aria-label="A tiny goblin companion" xmlns="http://www.w3.org/2000/svg">
    <path d="M31 47 12 37l12 22m55-12 19-10-12 22" fill="${style.skin}" stroke="#152d22" stroke-width="3" stroke-linejoin="round"/>
    <path d="M29 69c2-20 10-31 26-31s24 11 26 31c-9 12-43 12-52 0Z" fill="${style.skin}" stroke="#152d22" stroke-width="3"/>
    <path d="M35 48c5-17 13-24 21-24s17 7 21 24" fill="${style.hat}" stroke="#152d22" stroke-width="3"/>
    <path d="M51 42h18" stroke="${style.hat}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="44" cy="58" r="6" fill="#f4f0d8" stroke="#152d22" stroke-width="2"/><circle cx="67" cy="58" r="6" fill="#f4f0d8" stroke="#152d22" stroke-width="2"/>
    <circle cx="45" cy="59" r="2.5" fill="${style.eyes}"/><circle cx="66" cy="59" r="2.5" fill="${style.eyes}"/>
    <path d="M50 70c5 4 10 4 15 0" fill="none" stroke="#152d22" stroke-width="2" stroke-linecap="round"/>
    <path d="M37 76c10 5 26 5 36 0v20H37Z" fill="${style.shirt}" stroke="#152d22" stroke-width="3"/>
    ${accessoryShapes[accessory]}${petShapes[pet]}
  </svg>`;
}

let categories = loadCategories();
let tasks = loadTasks();
let lifetimeCompletedCount = loadLifetimeCompletedCount();
let draggedTaskId = null;
let currentView = "camps";
let calendarDate = new Date();
calendarDate.setDate(1);

const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const newQuestDialog = document.querySelector("#newQuestDialog");
const board = document.querySelector("#board");
const template = document.querySelector("#taskTemplate");
const saveStatus = document.querySelector("#saveStatus");
const categorySelect = document.querySelector("#taskCategory");
const editCategorySelect = document.querySelector("#editTaskCategory");
const categoryList = document.querySelector("#categoryList");
const categoryForm = document.querySelector("#categoryForm");
const goblinAdviceText = document.querySelector("#goblinAdvice");
const goblinIllustration = document.querySelector("#goblinIllustration");
const editDialog = document.querySelector("#editDialog");
const editTaskForm = document.querySelector("#editTaskForm");
let editingTaskId = null;

goblinAdviceText.textContent = goblinAdvice[Math.floor(Math.random() * goblinAdvice.length)];
goblinIllustration.innerHTML = createGoblinIllustration();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const loaded = saved ? JSON.parse(saved) : starterTasks;
    return loaded.map((task) => ({ ...task, assignee: task.assignee || "", category: task.category || categories[0].id }));
  } catch {
    return starterTasks;
  }
}

function loadCategories() {
  try {
    const saved = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterCategories;
  } catch {
    return starterCategories;
  }
}

function loadLifetimeCompletedCount() {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    if (saved) return JSON.parse(saved).lifetimeCompletedCount || 0;
  } catch {
    // Fall back to the completed tasks below when stored stats are unavailable.
  }
  return tasks.filter((task) => task.status === "done").length;
}

function saveStats() {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({ lifetimeCompletedCount }));
}

function saveCategories() {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
}

function categoryFor(task) {
  return categories.find((category) => category.id === task.category) || categories[0];
}

function populateCategorySelects() {
  [categorySelect, editCategorySelect].forEach((select) => {
    const currentValue = select.value;
    select.replaceChildren();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      select.appendChild(option);
    });
    select.value = categories.some((category) => category.id === currentValue) ? currentValue : categories[0].id;
  });
}

function renderCategoryManager() {
  categoryList.replaceChildren();
  categories.forEach((category) => {
    const row = document.createElement("div");
    row.className = "category-row";
    const swatch = document.createElement("span");
    swatch.className = "category-swatch";
    const nameInput = document.createElement("input");
    nameInput.value = category.name;
    nameInput.maxLength = 30;
    nameInput.setAttribute("aria-label", "Category name");
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = category.color;
    colorInput.setAttribute("aria-label", "Category color");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.setAttribute("aria-label", "Delete category");
    deleteButton.textContent = "×";
    row.append(swatch, nameInput, colorInput, deleteButton);
    nameInput.addEventListener("change", () => updateCategory(category.id, nameInput.value, colorInput.value));
    colorInput.addEventListener("change", () => updateCategory(category.id, nameInput.value, colorInput.value));
    swatch.style.backgroundColor = category.color;
    deleteButton.addEventListener("click", () => deleteCategory(category.id));
    categoryList.appendChild(row);
  });
}

function updateCategory(id, name, color) {
  const category = categories.find((item) => item.id === id);
  if (!category || !name.trim()) return;
  category.name = name.trim();
  category.color = color;
  saveCategories();
  populateCategorySelects();
  renderCategoryManager();
  render();
}

function deleteCategory(id) {
  if (categories.length === 1) {
    window.alert("Keep at least one category so every task has a content type.");
    return;
  }
  const replacement = categories.find((category) => category.id !== id);
  tasks.forEach((task) => {
    if (task.category === id) task.category = replacement.id;
  });
  categories = categories.filter((category) => category.id !== id);
  saveCategories();
  saveTasks();
  populateCategorySelects();
  renderCategoryManager();
  render();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  saveStatus.textContent = "Saved locally";
}

function setTaskStatus(task, status) {
  const wasDone = task.status === "done";
  task.status = status;
  if (status === "done" && !wasDone) {
    task.completedAt = new Date().toISOString();
    lifetimeCompletedCount += 1;
    saveStats();
  } else if (status !== "done") {
    delete task.completedAt;
  }
}

function completedInLast30Days(task) {
  if (!task.completedAt) return false;
  const completedAt = new Date(task.completedAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  return completedAt >= cutoff && completedAt <= new Date();
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
  const active = tasks.filter((task) => task.status !== "done").length;
  const completedThisMonth = tasks.filter(completedInLast30Days).length;
  const activityTotal = active + completedThisMonth;
  const progress = activityTotal ? Math.round((completedThisMonth / activityTotal) * 100) : 0;
  document.querySelector("#progressText").textContent = `${completedThisMonth} wrangled this month`;
  document.querySelector("#progressBar").style.width = `${progress}%`;
  document.querySelector("#taskCount").textContent = `${active} active ${active === 1 ? "quest" : "quests"} · ${lifetimeCompletedCount} victories to date`;
  renderCalendar();
}

function createTaskCard(task) {
    const card = template.content.cloneNode(true);
    const article = card.querySelector(".task-card");
    const priority = card.querySelector(".priority-pill");
    const due = formatDueDate(task.dueDate);
    const category = categoryFor(task);
    article.dataset.id = task.id;
    article.style.setProperty("--category-color", category.color);
    priority.textContent = task.priority;
    priority.classList.add(`priority-${task.priority}`);
    card.querySelector(".task-title").textContent = task.title;
    card.querySelector(".task-due").textContent = due.text || "No deadline · plenty of time";
    card.querySelector(".task-due").classList.toggle("overdue", due.overdue);
    card.querySelector(".task-assignee").textContent = task.assignee ? `Assigned to ${task.assignee}` : "Unassigned";
    const categoryLabel = card.querySelector(".task-category");
    categoryLabel.textContent = category.name;
    categoryLabel.style.color = category.color;
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
  const nextStatus = task.status === "todo" ? "doing" : task.status === "doing" ? "done" : "todo";
  setTaskStatus(task, nextStatus);
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
    category: data.get("category"),
    status: "todo",
  });
  form.reset();
  document.querySelector("#taskPriority").value = "medium";
  saveTasks();
  render();
  newQuestDialog.close();
  titleInput.focus();
});

document.querySelector("#focusAddTask").addEventListener("click", () => {
  newQuestDialog.showModal();
  titleInput.focus();
});
document.querySelector("#closeQuestDialog").addEventListener("click", () => newQuestDialog.close());
document.querySelectorAll(".camp").forEach((camp) => {
  camp.addEventListener("dragover", (event) => { event.preventDefault(); camp.classList.add("is-over"); });
  camp.addEventListener("dragleave", () => camp.classList.remove("is-over"));
  camp.addEventListener("drop", (event) => {
    event.preventDefault();
    camp.classList.remove("is-over");
    const task = tasks.find((item) => item.id === draggedTaskId);
    if (task) { setTaskStatus(task, camp.dataset.status); saveTasks(); render(); }
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
        item.style.backgroundColor = categoryFor(task).color;
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
    editTaskForm.elements.category.value = task.category;
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
    task.category = data.get("category");
    setTaskStatus(task, data.get("status"));
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
    admin: document.querySelector("#adminPanel"),
  };
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== view;
  });
  document.querySelectorAll(".nav-link").forEach((button) => {
    const active = button.id === `${view === "camps" ? "board" : view}View`;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#adminView").setAttribute("aria-pressed", String(view === "admin"));
}
document.querySelector("#adminView").addEventListener("click", () => setView("admin"));
document.querySelector("#previousMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});
document.querySelector("#nextMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});

categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(categoryForm);
  const name = data.get("name").trim();
  if (!name) return;
  categories.push({ id: crypto.randomUUID(), name, color: data.get("color") });
  saveCategories();
  categoryForm.reset();
  document.querySelector("#categoryColor").value = "#8ebf78";
  populateCategorySelects();
  renderCategoryManager();
});

populateCategorySelects();
renderCategoryManager();
render();
setView(currentView);
