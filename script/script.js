import {renderArticle, renderArticleSummaries, fetchData} from './articleRender.js';
import {startSectionID, articleSectionID} from './CommonSections.js';


const startNavID = document.getElementById("startNavID");
const privacyNavID = document.getElementById("privacyNavID");
const contactNavID = document.getElementById("contactNavID");
const productNavID = document.getElementById("productNavID");

const contactSectionID = document.getElementById("contactSectionID");

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

startNavID.click()
fetchData();