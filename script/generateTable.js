const table_id = document.getElementById('table_id')

const getPrice = (max, min) => 1000*Math.floor(Math.random()*(max-min) + min)

const getRandomItem = (list) => list[ Math.floor( Math.random()*list.length ) ]

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

const generateProducts = () =>
{
    let listofProducts = [];

    for(let i = 0; i < 100; i++)
    {
        listofProducts.push( [randomName(), getPrice(30, 4), getPrice(30, 4)] );
    }

    console.log(listofProducts)

    return listofProducts;
}

let table = new DataTable(table_id, {
    data: generateProducts(),
    columns: [
        { title: "Name" },
        { title: "Price" },
        { title: "installation Price"}
    ]
});