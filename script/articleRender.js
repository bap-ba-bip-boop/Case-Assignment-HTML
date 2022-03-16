import { setVisible } from './script.js';
import {startSectionID, articleSectionID} from './CommonSections.js';

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
    for(const key in content)
        if(typeof(elem[key]) == 'function')
            elem[key](...content[key]);
        else
            elem[key] = content[key];
    collector.appendChild(elem)
}

export const renderArticle = id =>{
    articleSectionID.innerHTML = '';
    const testData = listOfArticles.find( article => article.id == id );

    addPageElement(
        'h2',
        {
            innerHTML: testData.title
        },
        articleSectionID
    )

    if(testData.author != '')
    {
        addPageElement(
            'span',
            {
                innerHTML: 'skriven av:'
            },
            articleSectionID
        )
        addPageElement(
            'span',
            {
                innerHTML: testData.author
            },
            articleSectionID
        )
        addPageElement(
            'p',
            {
                innerHTML: testData.date.substring(0, testData.date.indexOf('T'))
            },
            articleSectionID
        )
    }
    testData.content.forEach(contentItem => {
        if(contentItem.type == 'ul')
        {
            const item = document.createElement(contentItem.type)
            contentItem.items.forEach(
                licontent => 
                addPageElement(
                    'li',
                    {
                        innerHTML: licontent
                    },
                    item
                )
                )
            articleSectionID.appendChild(item)
        }
        else
        {
            addPageElement(
                contentItem.type,
                {
                    innerHTML: contentItem.text
                },
                articleSectionID
            )
        }
    });
}

export const renderArticleSummaries = () =>{
    startSectionID.innerHTML ='';
    const listOfSummaries = listOfArticles.map(article => ({title: article.title, date: article.date, id: article.id, summary: article.summary}))

    listOfSummaries.forEach(articleSummary =>
        {
            if(articleSummary.id != 0)
            {
                const container = document.createElement('div');

                addPageElement(
                    'h3',
                    {
                        innerHTML: articleSummary.title
                    },
                    container
                )
                addPageElement(
                    'p',
                    {
                        innerHTML: articleSummary.date.substring(0, articleSummary.date.indexOf('T'))
                    },
                    container
                )
                addPageElement(
                    'p',
                    {
                        innerHTML: articleSummary.summary
                    },
                    container
                )
                addPageElement(
                    'a',
                    {
                        innerHTML: "Read More...",
                        href: "#",
                        addEventListener:
                        [
                            "click", 
                            ()=>{
                                renderArticle(articleSummary.id)
                                setVisible("privacyNavID")
                            }
                        ]
                    },
                    container
                )
                startSectionID.appendChild(container);
            }
        }
    )
}