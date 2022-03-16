import { setVisible } from './script.js';
import { startSectionID, articleSectionID } from './CommonSections.js';

let listOfArticles = [];

const ArticlePath = './JSON/Articles.json';

export const fetchData = () => {
    fetch(ArticlePath)
        .then(Response => Response.json())
        .then(jsonData => {
            listOfArticles = jsonData;
            setVisible("startNavID")
        })
}
const addPageElement = (type, content) => {
    const elem = document.createElement(type);
    for (const key in content)
        if (typeof (elem[key]) == 'function')
            elem[key](...content[key]);
        else
            elem[key] = content[key];
    return elem;
}

export const renderArticle = id => {
    articleSectionID.innerHTML = '';
    const testData = listOfArticles.find(article => article.id == id);

    articleSectionID.appendChild(
        addPageElement(
            'h2',
            {
                innerHTML: testData.title
            }
        )
    )

    if (testData.author != '') {
        [
            [
                'span',
                {
                    innerHTML: 'skriven av:'
                }
            ],
            [
                'span',
                {
                    innerHTML: testData.author
                }
            ],
            [
                'p',
                {
                    innerHTML: testData.date.substring(0, testData.date.indexOf('T'))
                }
            ]
        ].forEach( absDOM => articleSectionID.appendChild( addPageElement(...absDOM) ) )
    }
    
    testData.content.forEach(contentItem => {
        if (contentItem.type == 'ul') {
            const item = document.createElement(contentItem.type)
            contentItem.items.forEach(
                licontent =>
                    item.appendChild(
                        addPageElement(
                            'li',
                            {
                                innerHTML: licontent
                            }
                        )
                    )
            )
            articleSectionID.appendChild(item)
        }
        else {
            articleSectionID.appendChild(
                addPageElement(
                    contentItem.type,
                    {
                        innerHTML: contentItem.text
                    }
                )
            )
        }
    });
}

export const renderArticleSummaries = () => {
    startSectionID.innerHTML = '';
    listOfArticles.map(
        article => ({ title: article.title, date: article.date, id: article.id, summary: article.summary })
        ).forEach(articleSummary => {
        if (articleSummary.id != 0)//title, date, summary, id
        {
            const container = document.createElement('div');
            
            [
                [
                    'h3',
                    {
                        innerHTML: articleSummary.title
                    }
                ],
                [
                    'p',
                    {
                        innerHTML: articleSummary.date.substring(0, articleSummary.date.indexOf('T'))
                    }
                ],
                [
                    'p',
                    {
                        innerHTML: articleSummary.summary
                    }
                ],
                [
                    'a',
                    {
                        innerHTML: "Read More...",
                        href: "#",
                        addEventListener:
                            [
                                "click",
                                () => {
                                    renderArticle(articleSummary.id)
                                    setVisible("privacyNavID")
                                }
                            ]
                    }
                ]
            ].forEach( absDOM => container.appendChild( addPageElement(...absDOM) ) )

            startSectionID.appendChild(container);
        }
    }
    )
}