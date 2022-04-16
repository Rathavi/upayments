import { product } from '../interfaces/app.interface';

export class ApiService {

    private host : string = 'https://62286b649fd6174ca82321f1.mockapi.io/';

    public async getProducts(): Promise<any> {
        const response = await fetch(`${this.host}case-study/products/`);
        return await response.json();
    }

    public async getProduct(id: string): Promise<any> {
        const response = await fetch(`${this.host}case-study/products/${id}`);
        return await response.json();
    }

    public async addProduct(product: product): Promise<any> {
        const response = await fetch(`${this.host}case-study/products/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({product})
        })
        return await response.json();
    }

    public async deleteProduct(id: string): Promise<any> {
        const response = await fetch(`${this.host}case-study/products/${id}`, {
            method: 'DELETE'
        })
        return await response.json();
    }

    public async getCategories(): Promise<any> {
        const response = await fetch(`${this.host}case-study/categories/`);
        return await response.json();
    }    

}