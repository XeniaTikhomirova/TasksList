const form = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const inputLi = document.querySelector<HTMLUListElement>(".list");

type Task = {
   description: string,
   isCompleted: boolean
}

const tasks: Task[] = loadTasks();

form?.addEventListener("submit", createTasks)

function createTasks(evt: SubmitEvent){
   evt.preventDefault();
   const taskDescription = formInput?.value;
   if(taskDescription){
      const task: Task = {
         description: taskDescription,
         isCompleted: false
      }
      addTask(task);
      renderTask(task);
      updateStorage();
      formInput.value = "";
      return
   }
   alert("Provide description of the task!");
}

function addTask(task: Task):void {
   tasks.push(task);
   console.log(tasks);
}

function renderTask(task:Task):void{
   const taskElement = document.createElement("li");
   taskElement.textContent = task.description;

   const checkBox = document.createElement("input");
   checkBox.type = "checkbox";
   checkBox.checked = task.isCompleted;

   checkBox.addEventListener("change", () => {
      checkBox.checked = !task.isCompleted;
      updateStorage();
   })

   taskElement.appendChild(checkBox);
   inputLi?.appendChild(taskElement);
}

function loadTasks():Task[]{
   const storedTasks = localStorage.getItem("tasks");
   return storedTasks ? JSON.parse(storedTasks) : [];
}

tasks.forEach((task) => renderTask(task));

function updateStorage():void{
   localStorage.setItem("tasks", JSON.stringify(tasks))
}