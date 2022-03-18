
const HamburgerNavID = document.getElementById("HamburgerNavID")
export const navListID = document.getElementById("navListID");

/**
 * sätter en temporär property på navList när hamburger button clickas och tar bort den när listan ska visas igen
 */
HamburgerNavID.addEventListener("click", ()=>{
    if(navListID.style.display != 'none')
        navListID.style.display = 'none';
    else
        navListID.style.removeProperty('display')
})

/**
 * nödfunktion som behövs för att se till att propertyn tas bort när menyn är stängd och skärmen blir stor igen
 */
const resizedCheck = () =>{
    if(window.innerWidth > 992)
    {
        navListID.style.removeProperty('display')
    }
}

window.onresize = resizedCheck;