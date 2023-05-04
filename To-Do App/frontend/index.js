const todoApiUrl = "http://localhost:3003/todo";
const searchButton = document.querySelector("#get-todo");

function createToDo(data) {
  console.log(data.task);
  let results = document.querySelector(".results");
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "card");
  let h1 = document.createElement("h1");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  // let span = document.createElement("span");
  // let label = document.createElement("label");
  h1.innerText = `Task: ${data.task}`;
  h2.innerText = `Task Start Date: ${data.task_start}`;
  h3.innerText = `Task Deadline: ${data.task_deadline}`;
  newDiv.append(h1);
  newDiv.append(h2);
  newDiv.append(h3);

  //   return
  results.append(newDiv);
}

$("#get-todo").on("click", function () {
  $.get(todoApiUrl).then(function (data) {
    console.log(data);
    for (let key in data) {
      createToDo(data[key]);
    }
  });
});
