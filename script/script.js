import {renderArticle, renderArticleSummaries, fetchData} from './articleRender.js';
import {startSectionID, articleSectionID} from './CommonSections.js';


const startNavID = document.getElementById("startNavID");
const privacyNavID = document.getElementById("privacyNavID");
const contactNavID = document.getElementById("contactNavID");
const productNavID = document.getElementById("productNavID");
const productSectionID = document.getElementById("productSectionID")

const contactSectionID = document.getElementById("contactSectionID");

/**
 * sätter en section med motsvarande id synligt. Gör ingenting ifall id är felaktigt
 * @param {string} id id för den section som ska varaq synlig
 */
export const setVisible = id =>{
    if(id == "startNavID"){
        renderArticleSummaries()
        startSectionID.style.display = "block";
        articleSectionID.style.display = "none";
        contactSectionID.style.display = "none";
        productSectionID.style.display = "none";
    }
    else if(id == "privacyNavID"){
        startSectionID.style.display = "none";
        articleSectionID.style.display = "block";
        contactSectionID.style.display = "none";
        productSectionID.style.display = "none";
    }
    else if(id == "contactNavID"){
        startSectionID.style.display = "none";
        articleSectionID.style.display = "none";
        contactSectionID.style.display = "block";
        productSectionID.style.display = "none";
    }
    else if(id == "productNavID"){
        startSectionID.style.display = "none";
        articleSectionID.style.display = "none";
        contactSectionID.style.display = "none";
        productSectionID.style.display = "block";
    }
}

startNavID.addEventListener("click", ()=>{
    setVisible("startNavID")
})


/**
 * privacy policy sidan är en artikel
 */
privacyNavID.addEventListener("click", ()=>{
    renderArticle(0)
    setVisible("privacyNavID")
})

contactNavID.addEventListener("click", ()=>{
    setVisible("contactNavID")
})

productNavID.addEventListener("click", ()=>{
    setVisible("productNavID")
})

fetchData();