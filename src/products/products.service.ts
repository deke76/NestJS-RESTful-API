import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private getSingleProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id == productId,
    );
    const product = this.products.find((prod) => prod.id == productId);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [{ ...product }, productIndex];
  }

  insertProduct(title: string, description: string, price: number): string {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  findAllProducts() {
    return [...this.products];
  }

  findProduct(productId: string) {
    const product = this.getSingleProduct(productId)[0];
    return { ...product };
  }

  editProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.getSingleProduct(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (desc) updatedProduct.description = desc;
    if (price) updatedProduct.price = price;
    this.products[index] = updatedProduct;
    return null;
  }

  deleteProduct(productId: string) {
    const index = this.getSingleProduct(productId)[1];
    this.products.splice(index, 1);
    return null;
  }
}