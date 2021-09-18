import { AggregateRoot } from "../../../../../common/domain/AggregateRoot";
import { Category } from "./Category";
import { ProductName } from "./ProductName";
import { ProductOption } from "./ProductOption";
import { StockKeepingUnitProduct } from "./StockKeepingUnitProduct";

export interface ProductProps {
  id: string;
  shopId: string;
  name: string;
  category: Category;
  productOptions: ProductOption[];
  stockKeepingUnitProducts: StockKeepingUnitProduct[];
}

export class Product extends AggregateRoot<Product> {
  public readonly id: string;
  private _shopId: string;
  private _name: ProductName;
  private _category: Category;
  private _productOptions: ProductOption[];
  private _stockKeepingUnitProducts: StockKeepingUnitProduct[];

  constructor(props: ProductProps) {
    super();

    this.id = props.id;
    this._shopId = props.shopId;
    this._name = new ProductName({ name: props.name });
    this._category = props.category;
    this._productOptions = props.productOptions;
    this._stockKeepingUnitProducts = props.stockKeepingUnitProducts;
  }

  get name(): ProductName {
    return this._name;
  }

  get shopId(): string {
    return this._shopId;
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
