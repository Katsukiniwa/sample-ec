export class ProductsView {
  public products: { id: string; name: string }[];

  constructor(products: { id: string; name: string }[]) {
    this.products = products;
  }
}
