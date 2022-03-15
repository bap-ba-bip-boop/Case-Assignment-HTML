import {renderArticle, renderArticleSummaries, fetchData} from './articleRender.js'

const startNavID = document.getElementById("startNavID")
const privacyNavID = document.getElementById("privacyNavID")
const contactNavID = document.getElementById("contactNavID")

const startSectionID = document.getElementById("startSectionID")
const articleSectionID = document.getElementById("articleSectionID")
const contactSectionID = document.getElementById("contactSectionID")

export const setVisible = id =>{
    if(id == "startNavID"){
        renderArticleSummaries()
        startSectionID.style.display = "block";
        articleSectionID.style.display = "none";
        contactSectionID.style.display = "none";
    }
    else if(id == "privacyNavID"){
        startSectionID.style.display = "none";
        articleSectionID.style.display = "block";
        contactSectionID.style.display = "none";
    }
    else if(id == "contactNavID"){
        startSectionID.style.display = "none";
        articleSectionID.style.display = "none";
        contactSectionID.style.display = "block";
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

fetchData();