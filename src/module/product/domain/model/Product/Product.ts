import { AggregateRoot } from "~/common/domain/AggregateRoot";
import { Category } from "./Category";
import { ProductOption } from "./ProductOption";
import { StockKeepingUnitProduct } from "./StockKeepingUnitProduct";

export interface ProductProps {
  id: string;
  name: string;
  category: Category;
  productOptions: ProductOption[];
  stockKeepingUnitProducts: StockKeepingUnitProduct[];
}

export class Product extends AggregateRoot<Product> {
  public readonly id: string;
  private _name: string;
  private _category: Category;
  private _productOptions: ProductOption[];
  private _stockKeepingUnitProducts: StockKeepingUnitProduct[];

  constructor(id: string, props: ProductProps) {
    super();
    
    this.id = id;
    this._name = props.name;
    this._category = props.category;
    this._productOptions = props.productOptions;
    this._stockKeepingUnitProducts = props.stockKeepingUnitProducts;
  }

  get name(): string {
    return this._name;
  }

  get category(): Category {
    return this._category;
  }

  get productOptions(): ProductOption[] {
    return this._productOptions;
  }

  get stockKeepingUnitProducts(): StockKeepingUnitProduct[] {
    return this._stockKeepingUnitProducts;
  }
}
