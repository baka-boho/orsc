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

function toggleModel(text){
  var model=document.getElementById(text)
  model.classList.toggle("hidden")
  model.classList.toggle("visible")
  // console.log(text)
}

function toggleEvent(text){
  var card=document.getElementById(text)
  // console.log(card);
  card.firstElementChild.classList.toggle("hidden")
}

