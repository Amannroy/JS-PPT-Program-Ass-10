const http = require('http');

// Sample product data
const menProducts = [
    {
        id: '1',
        name: "Men's T-Shirt",
        brand: "ABC",
        price: 19.99,
        color: "Blue",
        size: 'M',
        category: "Clothing"
    },
];

const womenProducts = [
    {
        id: '1',
        name: "Women's T-Shirt",
        brand: "XYZ",
        price: 20.99,
        color: "Red",
        size: 'S',
        category: "Clothing"
    },
];



const server = http.createServer((req,res) => {
    const { method, url } = req;

    if(method === 'GET'){
        if(url === '/'){
            res.setHeader('Content-Type', 'text/plain');
            res.end('Welcome to Men & Women Dummy Data');
        }else if(url === '/men'){
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(menProducts));
        }else if(url === '/women'){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(womenProducts));
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Page not found');
        }
    }else{
            res.statusCode = 405;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Method Not Allowed');
        }

});

const port = 3000;
server.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});