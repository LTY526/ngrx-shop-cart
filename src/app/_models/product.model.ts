export class Product {
  constructor() {
    this.id = 0;
    this.title = '';
    this.price = '';
    this.category = '';
    this.description = '';
    this.image = '';
    this.rating = {
      rate: 0,
      count: 0,
    };
  }
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}