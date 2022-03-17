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
/*
    typeof(elem[key]) == 'Object'
        for(const key1 in elem[key])
            elem[key] += addPAgeElement(...elem[key][key1])
*/
const addPageElement = (type, content) => {
    const elem = document.createElement(type);
    for (const key in content)
        if (typeof (elem[key]) == 'function')
            elem[key](...content[key]);
        else
            elem[key] = content[key];
    return elem;
}

console.log(typeof["hi", "i", "am"])

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
                    innerHTML: 'Skriven av:'
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
                    innerHTML: testData.date
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
            container.classList = 'articleSummaryContainer';
            [
                [
                    'h3',
                    {
                        innerHTML: articleSummary.title,
                        classList: 'articleSummaryHeader'
                    }
                ],
                [
                    'p',
                    {
                        innerHTML: articleSummary.date,
                        classList: 'articleSummaryDate'
                    }
                ],
                [
                    'p',
                    {
                        innerHTML: articleSummary.summary,
                        classList: 'articleSummaryText'
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
                            ],
                        classList: 'articleSummaryLink'
                    }
                ]
            ].forEach( absDOM => container.appendChild( addPageElement(...absDOM) ) )
            startSectionID.appendChild(container);
        }
    }
    )
}