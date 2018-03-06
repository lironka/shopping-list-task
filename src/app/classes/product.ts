export class Product {
    id:  number;
    name: string;
    quantity: number;
    price: number;
    description: string;

    constructor(product?: Product){
        this.id = product && product.id || null;
        this.name = product && product.name || null;
        this.quantity = product && product.quantity || null;
        this.price = product && product.price || null;
        this.description = product && product.description || null;
    }
}
