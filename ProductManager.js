const fs = require('fs');

class ProductManager {
    #path
    
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this._loadProducts();
        product.id = this._getNextId(products);
        products.push(product);
        this._saveProducts(products);
    }

    getProduct(productId) {
        const products = this._loadProducts();
        return products.find(product => product.id === productId) || null;
    }

    updateProduct(productId, newData) {
        const products = this._loadProducts();
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...newData };
            this._saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        const products = this._loadProducts();
        const updatedProducts = products.filter(product => product.id !== productId);
        this._saveProducts(updatedProducts);
    }

    _loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    _saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
    }

    _getNextId(products) {
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
}

// Ejemplo de uso
const manager = new ProductManager("products.json");

const product1 = {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "ruta/imagen1.jpg",
    code: "ABC123",
    stock: 100
};

const product2 = {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 20.99,
    thumbnail: "ruta/imagen2.jpg",
    code: "DEF456",
    stock: 50
};

manager.addProduct(product1);
manager.addProduct(product2);

console.log(manager.getProduct(1));

manager.updateProduct(1, { price: 12.99 });
console.log(manager.getProduct(1));

manager.deleteProduct(2);
