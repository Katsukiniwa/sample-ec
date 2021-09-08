import { AggregateRoot } from "~/common/domain/AggregateRoot";
import { Category } from "./Category";
import { ProductOption } from "./ProductOption";
import { StockKeepingUnitProduct } from "./StockKeepingUnitProduct";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  category: Category;
  stock: number;
  stockKeepingUnits: ProductOption[];
  stockKeepingUnitProducts: StockKeepingUnitProduct[];
}

export class Product extends AggregateRoot<Product> {
  public readonly id: string;
  private _name: string;
  private _price: number;
  private _category: Category;
  private _stock: number;
  private _productOptions: ProductOption[];
  private _stockKeepingUnitProducts: StockKeepingUnitProduct[];

  constructor(id: string, props: ProductProps) {
    super();
    
    this.id = id;
    this._name = props.name;
    this._price = props.price;
    this._category = props.category;
    this._stock = props.stock;
    this._productOptions = props.stockKeepingUnits;
    this._stockKeepingUnitProducts = props.stockKeepingUnitProducts;
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

  get productOptions(): ProductOption[] {
    return this._productOptions;
  }

  get stockKeepingUnitProducts(): StockKeepingUnitProduct[] {
    return this._stockKeepingUnitProducts;
  }
}
