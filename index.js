 

const box=document.getElementById("issueBox")
const loader=document.getElementById("loader")
const tabList=document.querySelectorAll(".tab")

const BASE="https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab"


async function fetchIssues(type="all"){

loader.classList.remove("hidden")
box.innerHTML=""

let res=await fetch(BASE+"/issues")
let json=await res.json()

loader.classList.add("hidden")

let list=json.data

if(type==="open"){
list=list.filter(i=>i.status==="open")
}

if(type==="closed"){
list=list.filter(i=>i.status==="closed")
}

document.getElementById("issueTotal").innerText=list.length+" Issues"

list.forEach(item=>{

let card=document.createElement("div")

card.className="bg-white rounded-lg shadow border p-4 hover:shadow-lg transition cursor-pointer"

card.innerHTML=`

<div class="flex justify-between items-center mb-2">

<img src="assets/Open-Status.png" class="w-6 h-6"/>

<span class="px-3 py-1 text-xs rounded-full
${item.priority==="HIGH"?"bg-red-100 text-red-500":
item.priority==="MEDIUM"?"bg-yellow-100 text-yellow-600":
"bg-gray-200 text-gray-600"}">

${item.priority}

</span>

</div>

<h2 class="font-semibold text-sm mb-1">

${item.title}

</h2>

<p class="text-xs text-gray-500 mb-3">

${item.description.slice(0,80)}...

</p>

<div class="flex gap-2 mb-3">

<span class="text-xs border border-red-300 text-red-500 px-2 py-1 rounded">
BUG
</span>

<span class="text-xs border border-orange-300 text-orange-500 px-2 py-1 rounded">
HELP WANTED
</span>

</div>

<div class="flex justify-between text-xs text-gray-400">

<span>
#1 by ${item.author}
</span>

<span>
${new Date(item.createdAt).toLocaleDateString()}
</span>

</div>

`

card.onclick=()=>showDetails(item.id)

box.appendChild(card)

})

}


function activeTab(btn){

tabList.forEach(t=>t.classList.remove("tab-active"))

btn.classList.add("tab-active")

}


async function showDetails(id){

let res=await fetch(BASE+"/issue/"+id)

let json=await res.json()

let item=json.data

document.getElementById("titleView").innerText=item.title
document.getElementById("descView").innerText=item.description
document.getElementById("authorView").innerText=item.author
document.getElementById("authorView2").innerText=item.author
document.getElementById("priorityView").innerText=item.priority
document.getElementById("dateView").innerText=new Date(item.createdAt).toLocaleDateString()

document.getElementById("detailsModal").showModal()

}


async function findIssue(){

let keyword=document.getElementById("searchField").value

let res=await fetch(BASE+"/issues/search?q="+keyword)

let json=await res.json()

box.innerHTML=""

json.data.forEach(item=>{

let card=document.createElement("div")

card.className="bg-white rounded-lg shadow p-4"

card.innerHTML=`

<h2 class="font-semibold text-sm">
${item.title}
</h2>

<p class="text-xs text-gray-500">
${item.description}
</p>

`

card.onclick=()=>showDetails(item.id)

box.appendChild(card)

})

}


fetchIssues()

