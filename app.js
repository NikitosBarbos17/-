let resources = JSON.parse(localStorage.getItem("resources")) || []

const form = document.getElementById("resourceForm")
const tableBody = document.getElementById("tableBody")

function readForm(){

return{
title: document.getElementById("title").value.trim(),
url: document.getElementById("url").value.trim(),
type: document.getElementById("type").value,
description: document.getElementById("description").value.trim(),
author: document.getElementById("author").value.trim()
}

}

function validate(data){

let valid=true

document.querySelectorAll(".error").forEach(e=>e.textContent="")
document.querySelectorAll("input,select,textarea").forEach(e=>e.classList.remove("invalid"))

if(!data.title){
titleError.textContent="Введіть назву"
title.classList.add("invalid")
valid=false
}

if(!data.url || !data.url.startsWith("http")){
urlError.textContent="Введіть правильний URL"
url.classList.add("invalid")
valid=false
}

if(!data.type){
typeError.textContent="Оберіть тип"
type.classList.add("invalid")
valid=false
}

if(!data.description){
descriptionError.textContent="Введіть опис"
description.classList.add("invalid")
valid=false
}

if(!data.author){
authorError.textContent="Введіть автора"
author.classList.add("invalid")
valid=false
}

return valid

}

function saveStorage(){
localStorage.setItem("resources",JSON.stringify(resources))
}

function addResource(data){

data.id = Date.now()

resources.push(data)

saveStorage()

render()

form.reset()

}

function deleteResource(id){

resources = resources.filter(r=>r.id!==id)

saveStorage()

render()

}

function render(){

tableBody.innerHTML=""

let search = document.getElementById("search").value.toLowerCase()

let filtered = resources.filter(r =>
r.title.toLowerCase().includes(search)
)

filtered.forEach(r=>{

let row=document.createElement("tr")

row.innerHTML=`

<td>${r.title}</td>
<td><a href="${r.url}" target="_blank">Перейти</a></td>
<td>${r.type}</td>
<td>${r.description}</td>
<td>${r.author}</td>

<td>
<button data-delete="${r.id}">Видалити</button>
</td>

`

tableBody.appendChild(row)

})

}

form.addEventListener("submit",function(e){

e.preventDefault()

let data = readForm()

if(!validate(data)) return

addResource(data)

})

tableBody.addEventListener("click",function(e){

if(e.target.dataset.delete){

deleteResource(Number(e.target.dataset.delete))

}

})

document.getElementById("search").addEventListener("input",render)

render()