let todos = [];
let leftdiv;
let text;

function init() {
  let maincontainer = document.getElementById("main-container");
  leftdiv = document.createElement("div");
  maincontainer.appendChild(leftdiv);
  leftdiv.setAttribute("id", "left");
  let heading = document.createElement("h1");
  heading.setAttribute("id", "heading");
  heading.innerHTML = "All Your Task Will appear here....";
  leftdiv.appendChild(heading);
  let rightdiv = document.createElement("div");
  rightdiv.setAttribute("id", "right");
  let inputElement = document.createElement("textarea");
  inputElement.setAttribute("id", "inputbox");
  inputElement.setAttribute(
    "placeholder",
    "Enter Your Todo Task here... It will be appending in next line"
  );
  inputElement.addEventListener("keyup", inputhandler);
  rightdiv.appendChild(inputElement);
  maincontainer.appendChild(rightdiv);

  text = inputElement;
}

function inputhandler(e) {
  let key = e.key;
  let value = text.value;
  if (key == "Enter") {
    var heading = document.createElement("h2");
    var deletebutton = document.createElement("button");
    var editbutton = document.createElement("button");
    var container = document.createElement("div");
    var uniqueId = "todo-" + Date.now(); 
    container.setAttribute("class", "todo_container");
    container.setAttribute("id", uniqueId);
    leftdiv.appendChild(container);
    heading.innerHTML = value;
    todos.push({ id: uniqueId, text: value }); 
    localStorage.setItem("todo", JSON.stringify(todos));
    deletebutton.innerHTML = "Delete";
    editbutton.innerHTML = "Edit";
    container.appendChild(heading);
    container.appendChild(deletebutton);
    container.appendChild(editbutton);

    deletebutton.addEventListener("click", function () {
      container.remove();
      var index = todos.findIndex((todo) => todo.id === uniqueId); 
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(todos));
      }
    });

    editbutton.addEventListener("click", function () {
      var newText = prompt("Enter the updated text:");
      heading.innerHTML = newText;

      var index = todos.findIndex((todo) => todo.id === uniqueId); 
      if (index !== -1) {
        todos[index].text = newText;
        localStorage.setItem("todo", JSON.stringify(todos));
      }
    });

    text.value = "";
  }
}

init();

let values = localStorage.getItem("todo");

if (values !== null) {
  let parsed = JSON.parse(values);
  todos = parsed;
  parsed.forEach((todo) => {
    var heading = document.createElement("h2");
    var deletebutton = document.createElement("button");
    var editbutton = document.createElement("button");
    var container = document.createElement("div");
    container.setAttribute("class", "todo_container");
    container.setAttribute("id", todo.id); 
    leftdiv.appendChild(container);
    heading.innerHTML = todo.text;
    deletebutton.innerHTML = "Delete";
    editbutton.innerHTML = "Edit";
    container.appendChild(heading);
    container.appendChild(deletebutton);
    container.appendChild(editbutton);

    deletebutton.addEventListener("click", function () {
      container.remove();
      var index = todos.findIndex((item) => item.id === todo.id); 
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(todos));
      }
    });

    editbutton.addEventListener("click", function () {
      var newText = prompt("Enter the updated text:");
      heading.innerHTML = newText;

      var index = todos.findIndex((item) => item.id === todo.id); 
      if (index !== -1) {
        todos[index].text = newText;
        localStorage.setItem("todo", JSON.stringify(todos));
      }
    });
  });

  text.value = "";
}
