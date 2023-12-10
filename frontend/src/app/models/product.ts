export class Product {
  ref: string;
  name: string;
  price: number;

  constructor(ref: string, name: string, price: number) {
    this.ref = ref;
    this.name = name;
    this.price = price;
  }
}
