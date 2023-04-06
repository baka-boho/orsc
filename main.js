var isopen = false
function openNav() {
  document.getElementById("Nav").style.right = "-100%";
  document.getElementById("close-btn").style.display = "block";
  document.getElementById("open-btn").style.display = "none";
  isopen = true
}

function closeNav() {
  if (isopen) {
    document.getElementById("Nav").style.transition = ".3s";
    document.getElementById("Nav").style.right = "-200%";
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("open-btn").style.display = "block";
    isopen = false
  }
}

function openQuestion(nbr) {
  if (document.getElementById(nbr).style.maxHeight == "0px") {
    // document.getElementById(nbr).style.display = "block"
    document.getElementById(nbr).style.maxHeight = "300px"
    document.getElementById(nbr).style.padding = "1rem"
    document.getElementById(nbr).style.borderTop = "2px solid var(--b)"
    document.getElementById('b' + nbr).style.transform = "rotate(180deg)"
  } else {
    // document.getElementById(nbr).style.display = "none"
    // document.getElementById(nbr).style.borderTop= "none"
    document.getElementById(nbr).style.maxHeight = "0px"
    document.getElementById(nbr).style.padding = "0"
    document.getElementById(nbr).style.borderTop = "none"
    document.getElementById('b' + nbr).style.transform = "none"
  }
}
// console.log(text)
// }
// document.getElementById('event-content').scrollBy();

function toggleModel(text) {
  var model = document.getElementById(text)
  model.classList.toggle("hidden")
  model.classList.toggle("visible")
  // console.log(text)
}

function toggleEvent(text) {
  var card = document.getElementById(text)
  // console.log(card);
  card.firstElementChild.classList.toggle("hidden")
}


events = document.getElementById('event-content')
events = events.children
projects = document.getElementById('project-content')
projects = projects.children
console.log(events)
console.log(projects)

let event_options = {
  root: document.querySelector("#event-content"),
  rootMargin: "0px",
  threshold: 0.9,
};
let project_options = {
  root: document.querySelector("#project-content"),
  rootMargin: "0px",
  threshold: 0.9,
};
var event_vis = {}
var project_vis = {}

let Event_callback = (entries) => {
  entries.forEach((entry) => {
    event_vis[entry.target.id] = entry.isIntersecting
  });
}
let Project_callback = (entries) => {
  entries.forEach((entry) => {
    project_vis[entry.target.id] = entry.isIntersecting
  });
};
let Event_observer = new IntersectionObserver(Event_callback, event_options);
let Project_observer = new IntersectionObserver(Project_callback, project_options);

for (let i = 0; i < events.length; i++) {
  Event_observer.observe(events[i])
}
for (let i = 0; i < projects.length; i++) {
  Project_observer.observe(projects[i])
}

// events
// console.log(event);
// })
function slide(a, b) {
  if(a==0){
    vis=event_vis
  }
  if(a==1){
    vis=project_vis
  }
  left = Object.values(vis).indexOf(true)
  right =left+2
  first_id = Object.keys(vis).at(left)
  last_id = Object.keys(vis).at(right)
console.log(left,first_id,right,last_id)
console.log('b',b,'l',)  
if(b==1){
    if(right>=Object.values(vis).length-1){
      slide(a,-1)
    }else{
      target=document.getElementById(Object.keys(vis).at(right+1))
      console.log('=============')
      console.log(target)
      target.scrollIntoView({ behavior: "smooth",block:"center", inline: "nearest" });
    }
  }
  if(b==-1){
    if(left<=0){
      slide(a, 1)
    }else{
      target=document.getElementById(Object.keys(vis).at(left-1))
      console.log('xxxxxxxxxxxxxxxxx')
      console.log(target)
      target.scrollIntoView({ behavior: "smooth",block:"center", inline: "nearest" });
    }
  }
}

