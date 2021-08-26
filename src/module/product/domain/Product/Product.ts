import { Entity } from "~/common/domain/Entity";
import { Category } from "./Category";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  category: Category;
  stock: number;
}

export class Product extends Entity<Product> {
  public readonly id: string;
  private _name: string;
  private _price: number;
  private _category: Category;
  private _stock: number;

  constructor(id: string, props: ProductProps) {
    super();
    
    this.id = id;
    this._name = props.name;
    this._price = props.price;
    this._category = props.category;
    this._stock = props.stock;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get category(): Category {
    return this._category;
  }

  get stock(): number {
    return this._stock;
  }
}
