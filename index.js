
const issuesGrid=document.getElementById("issuesGrid")
const loadingSpinner=document.getElementById("loadingSpinner")
const tabButtons=document.querySelectorAll(".tab")

const issuesEndpoint="https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issues"
const issueDetailsEndpoint="https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issue/"
const issueSearchEndpoint="https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q="


const getIssues=(filterType="all")=>{

//  spinner 

loadingSpinner.classList.remove("hidden")

fetch(issuesEndpoint)
.then((response)=>response.json())
.then((result)=>{

loadingSpinner.classList.add("hidden")

let issuesList=result.data

if(filterType==="open"){
issuesList=issuesList.filter(i=>i.status==="open")
}

if(filterType==="closed"){
issuesList=issuesList.filter(i=>i.status==="closed")
}

showIssues(issuesList)

})

}


const showIssues=(issuesList)=>{

issuesGrid.innerHTML=""

document.getElementById("totalIssuesText").innerText=
issuesList.length+" Issues"


issuesList.forEach(issue=>{

let issueCard=document.createElement("div")

issueCard.className=`bg-white rounded-lg shadow border-t-4 p-4 hover:shadow-lg transition cursor-pointer
${issue.status==="open"?"border-green-500":"border-purple-500"}
`

issueCard.innerHTML=`

<div class="flex justify-between items-center mb-3">

<div class="flex items-center gap-2">

<img src="${issue.status==="open"?"assets/Open-Status.png":"assets/Closed- Status .png"}"
class="w-5 h-5"/>

<span class="text-xs font-semibold text-gray-500 uppercase">
${issue.status}
</span>

</div>

<span class="px-3 py-1 text-xs font-semibold rounded-full
${issue.priority==="HIGH" ?"bg-red-100 text-red-600" :issue.priority==="MEDIUM" ?"bg-yellow-100 text-yellow-600" :"bg-gray-100 text-gray-600"}">

${issue.priority}

</span>

</div>

<h2 class="font-semibold text-sm mb-2 leading-5">
${issue.title}
</h2>

<p class="text-xs text-gray-500 mb-4">
${issue.description.slice(0,80)}...
</p>

<div class="flex gap-2 mb-4">

<span class="text-xs border border-red-300 text-red-500 px-2 py-1 rounded">
BUG
</span>

<span class="text-xs border border-orange-300 text-orange-500 px-2 py-1 rounded">
HELP WANTED
</span>

</div>

<div class="flex justify-between items-center text-xs text-gray-400">

<span>
#${issue.id} by ${issue.author}
</span>

<span>
${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>

`

issueCard.onclick=()=>getIssueDetails(issue.id)

issuesGrid.appendChild(issueCard)

})

}


const getIssueDetails=(issueId)=>{

const url=issueDetailsEndpoint+issueId

fetch(url)
.then((response)=>response.json())
.then((result)=>{

showIssueDetails(result.data)

})

}


const showIssueDetails=(issue)=>{

document.getElementById("detailsTitle").innerText=issue.title
document.getElementById("detailsDescription").innerText=issue.description
document.getElementById("detailsAuthor").innerText=issue.author
document.getElementById("detailsAuthor2").innerText=issue.author
document.getElementById("detailsPriority").innerText=issue.priority
document.getElementById("detailsDate").innerText=
new Date(issue.createdAt).toLocaleDateString()

document.getElementById("detailsModalBox").showModal()

}


const findIssues=()=>{

let searchText=document.getElementById("issueSearchField").value

const url=issueSearchEndpoint+searchText

fetch(url)
.then((response)=>response.json())
.then((result)=>{

showIssues(result.data)

})

}


function activateTab(button){

tabButtons.forEach(tab=>tab.classList.remove("tab-active"))

button.classList.add("tab-active")

}


getIssues();
