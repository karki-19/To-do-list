const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-Container");
function addTask(){
   if(inputbox.value === '')
   {
      alert("Please Enter Something");
   }
   else{
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = 
}
}
// Code now 