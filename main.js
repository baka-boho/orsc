var isopen=false
function openNav() {document.getElementById("Nav").style.right = "-100%";
    document.getElementById("close-btn").style.display = "block";
    document.getElementById("open-btn").style.display = "none";
    isopen=true
  }
  
  function closeNav() {
    if(isopen){
        document.getElementById("Nav").style.transition = ".3s";
        document.getElementById("Nav").style.right = "-200%";
        document.getElementById("close-btn").style.display = "none";
        document.getElementById("open-btn").style.display = "block";
        isopen=false
    }
  }

  function openQuestion(nbr){
    if(document.getElementById(nbr).style.display=="none"){
      document.getElementById(nbr).style.display="block"
    document.getElementById('b'+nbr).style.transform="rotate(180deg)"
    }else{
    document.getElementById(nbr).style.display="none"
    document.getElementById('b'+nbr).style.transform="none"
    }
  }