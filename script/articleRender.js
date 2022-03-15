import { setVisible } from './script.js';

let listOfArticles = [];

const ArticlePath = './JSON/Articles.json';

export const fetchData = () =>{
    fetch(ArticlePath)
        .then(Response => Response.json())
        .then(jsonData => {
            listOfArticles = jsonData;
            setVisible("startNavID")
        })
}

const addPageElement = (type, content, collector) =>{
    const elem = document.createElement(type);
    elem.innerHTML += content;
    collector.appendChild(elem)
}

const articleContainerID = document.getElementById("articleContainerID");

export const renderArticle = id =>{
    articleContainerID.innerHTML = '';
    const testData = listOfArticles.find( article => article.id == id );

    addPageElement('h2', testData.title, articleContainerID)

    if(testData.author != ''){
        addPageElement('span', 'skriven av:', articleContainerID)
        addPageElement('span', testData.author, articleContainerID)
        addPageElement('p', testData.date.substring(0, testData.date.indexOf('T')), articleContainerID)
    }
    testData.content.forEach(contentItem => {
        if(contentItem.type == 'ul')
        {
            const item = document.createElement(contentItem.type)
            contentItem.items.forEach( licontent => addPageElement('li', licontent, item))
            articleContainerID.appendChild(item)
        }
        else
        {
            addPageElement(contentItem.type, contentItem.text, articleContainerID)
        }
    });
}

const articleSummaryContainerID = document.getElementById("articleSummaryContainerID");

export const renderArticleSummaries = () =>{
    //const limit = 5;

    articleSummaryContainerID.innerHTML ='';
    const listOfSummaries = listOfArticles.map(article => ({title: article.title, date: article.date, id: article.id, summary: article.summary}))

    listOfSummaries.forEach(articleSummary =>
        {
            if(articleSummary.id != 0)
            {
                const container = document.createElement('div');

                addPageElement('h3', articleSummary.title, container)

                addPageElement('p', articleSummary.date.substring(0, articleSummary.date.indexOf('T')), container)

                addPageElement('p', articleSummary.summary, container)

                const articleLink = document.createElement('a')
                articleLink.innerHTML += "Read More..."
                articleLink.href = "#";
                articleLink.addEventListener("click", ()=>{
                    renderArticle(articleSummary.id)
                    setVisible("privacyNavID")
                })
                container.appendChild(articleLink);

                articleSummaryContainerID.appendChild(container);
            }
        }
        )
}