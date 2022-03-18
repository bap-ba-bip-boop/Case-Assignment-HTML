import { setVisible } from './script.js';
import { startSectionID, articleSectionID } from './CommonSections.js';

let listOfArticles = [];

const ArticlePath = './JSON/Articles.json';

/**
 * hämtar alla artiklar från JSON filen och sätter start sectionen synlig synlig
 */
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

/**
 * En funktion som skapar DOM objekt och fäster properties på den
 * @param {string} type beskriver vilken typ som ska skapas
 * @param {object} content allt innehåll som typen ska ha
 * @returns det skapade DOM objektet
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

/**
 * renderar en artikel med ett visst id
 * @param {number} id artikelns id
 */
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

/**
 * renderar artikelsummaries åt startsidan
 */
export const renderArticleSummaries = () => {
    startSectionID.innerHTML = '';
    listOfArticles.map(
        article => ({ title: article.title, date: article.date, id: article.id, summary: article.summary })
        ).forEach(articleSummary => {
        if (articleSummary.id != 0)//title, date, summary, id
        {
            const container = document.createElement('div');
            container.classList = 'roundedBox articleSummaryContainer';
            [
                [
                    'h3',
                    {
                        classList: 'articleSummaryHeader',
                        innerHTML: articleSummary.title
                    }
                ],
                [
                    'p',
                    {
                        classList: 'articleSummaryDate',
                        innerHTML: articleSummary.date
                    }
                ],
                [
                    'p',
                    {
                        classList: 'articleSummaryText',
                        innerHTML: articleSummary.summary
                    }
                ],
                [
                    'a',
                    {
                        addEventListener:
                        [
                            "click",
                            () => {
                                renderArticle(articleSummary.id)
                                setVisible("privacyNavID")
                            }
                        ],
                        classList: 'articleSummaryLink',
                        href: "#",
                        innerHTML: "Read More..."
                    }
                ]
            ].forEach( absDOM => container.appendChild( addPageElement(...absDOM) ) )
            startSectionID.appendChild(container);
        }
    }
    )
}