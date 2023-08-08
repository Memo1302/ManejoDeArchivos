const ProductManager = require('./ProductManager.js');

const mockProduct = {
    titel:'producto 1',
    description:'Producto 1 ejemplo',
    price: 10,
    thumbnail:'no tengo imagen',
    code:'produc123',
    stock: 10
}
const mockFailProduct = {
    titel:'producto 1',
    description:'Producto 1 ejemplo',
    price: 10,
    thumbnail:'no tengo imagen',
    code:'produc123',
    stock: 10
}
const productManager = new ProductManager('./products.json')


test()