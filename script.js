const addForm = document.querySelector(".add");
const ul = document.querySelector(".todos");
const savebtn = document.getElementById("save");
const discardbtn = document.getElementById("discard");
const submitbtn = document.getElementById("submit");

//display todo
const generateHtml = () => {
    let store = localStorage.getItem("localtask");

    if (store == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(store); //parsing string to object.
    }

    let html = "";

    taskObj.forEach((todo,index) => { // append li to html variable.
        html += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fa fa-edit edit" onclick="editTodo(${index})"></i> 
            <i class="far fa-trash-alt delete"></i>
          </li>
        `;
    });

    ul.innerHTML = html;
};
//add todos
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let todo = addForm.add.value.trim();
    // console.log(todo);
    if (todo.length) {
        let store = localStorage.getItem("localtask");

        if (store == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(store); //parsing string to object.
        }
        taskObj.push(todo);
        localStorage.setItem("localtask", JSON.stringify(taskObj));

        generateHtml();
    }
    addForm.reset();
});

//delete todos
ul.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();

        let store = localStorage.getItem("localtask");
        let taskObj = JSON.parse(store);

        let task= event.target.parentElement.textContent.trim();
        
        let index = taskObj.indexOf(task);

        if(index>-1)
            taskObj.splice(index,1);
 
        localStorage.setItem("localtask",JSON.stringify(taskObj));
    }
    console.log(event.target.style )
    //event.target.style.textDecoration ="lineThrough"
    event.target.parentElement.classList.toggle("selected")
});

//filter todo
const filterTodos = (text) => {
    // console.log(text);
    Array.from(ul.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(text))
        .forEach((todo) => todo.classList.add("filtered"));

    Array.from(ul.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(text))
        .forEach((todo) => todo.classList.remove("filtered"));
};

//keyup event
const search = document.querySelector(".search input");

search.addEventListener("keyup", (event) => {
    const text = search.value.trim().toLowerCase();
    filterTodos(text);
});

//edit todo
const saveIndex = document.getElementById("saveindex");

function editTodo(index) {
    saveIndex.value = index;
    let store = localStorage.getItem("localtask");
    let taskObj = JSON.parse(store);
    addForm.add.value = taskObj[index];
    savebtn.style.display = "inline";
    discardbtn.style.display = "inline";
    submitbtn.disabled = true;
    //disable form submit
}

savebtn.addEventListener('click', () =>{
    let store = localStorage.getItem("localtask");
    let taskObj = JSON.parse(store);  
    let index = saveIndex.value;
    taskObj[index] = addForm.add.value.trim();
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    savebtn.style.display = "none";
    discardbtn.style.display = "none";
    submitbtn.disabled = false;
    //enable form submit
    generateHtml();
    addForm.reset();
});


//discard edit
discardbtn.addEventListener('click',event=>{
   discardbtn.style.display = "none";
   savebtn.style.display = "none";
   addForm.reset();
});