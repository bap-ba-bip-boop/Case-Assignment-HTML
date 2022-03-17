
const HamburgerNavID = document.getElementById("HamburgerNavID")
const navListID = document.getElementById("navListID");

HamburgerNavID.addEventListener("click", ()=>{
    if(navListID.style.display != 'none')
        navListID.style.display = 'none';
    else
        navListID.style.removeProperty('display')
})

const resizedCheck = () =>{
    if(window.innerWidth > 992)
    {
        navListID.style.removeProperty('display')
    }
}

window.onresize = resizedCheck;