const table_id = document.getElementById('table_id')

/**
 * tar in ett max och minvärde på vad ett pris ska vara (i tusental) och returnerar ett framslumpat värde
 * @param {number} max det högsta värdet priset ska kunna vara
 * @param {nnumber} min det lägsta värdet priset ska kunna vara
 * @returns ett slumpat pris
 */
const getPrice = (max, min) => 1000*Math.floor(Math.random()*(max-min) + min)

/**
 * Slumpar fram ett värde i en array
 * @param {Array} list 
 * @returns det framslumpade värdet
 */
const getRandomItem = (list) => list[ Math.floor( Math.random()*list.length ) ]

/**
 * slumpar ett namn åt en produkt 
 * @returns ett slumpat namn
 */
const randomName = () =>
{
    const places = 
    [
        'Mora',
        'Värmland',
        'Jönköping',
        'Stockholm',
        'Göteborg',
        'Lund'
    ]
    const product =
    [
        'Element',
        'Pump',
        'Vattenkokare',
        'Värmepanna',
        'Kran',
        'Elektriskt Reglage'
    ]
    return `${getRandomItem(places)} ${getRandomItem(product)}`;
}

/**
 * Returnerar en lista med 100 slumpade produkter åt datatable
 * @returns en lista med 100 framslumpade produkter
 */
const generateProducts = () =>
{
    let listofProducts = [];

    for(let i = 0; i < 100; i++)
    {
        listofProducts.push( [randomName(), getPrice(30, 4), getPrice(30, 4)] );
    }

    return listofProducts;
}

let table = new DataTable(table_id, {
    data: generateProducts(),
    columns: [
        { title: "Name" },
        { title: "Price" },
        { title: "Installation Price"}
    ]
});