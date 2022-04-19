import { AggregateRoot } from "../../../../../common/domain/AggregateRoot";
import { Category } from "./Category";
import { StockChangeEvent } from "./event/StockChangeEvent";
import { ProductName } from "./ProductName";
import { ProductOption } from "./ProductOption";
import { StockKeepingUnitProduct } from "./StockKeepingUnitProduct";

export interface ProductProps {
  id: string;
  shopId: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  productOptions: ProductOption[];
  stockKeepingUnitProducts: StockKeepingUnitProduct[];
}

export class Product extends AggregateRoot<Product> {
  public readonly id: string;
  private _shopId: string;
  private _name: ProductName;
  private _description: string;
  private _category: Category;
  private _price: number;
  private _productOptions: ProductOption[];
  private _stockKeepingUnitProducts: StockKeepingUnitProduct[];

  constructor(props: ProductProps) {
    super();

    this.id = props.id;
    this._shopId = props.shopId;
    this._name = new ProductName({ name: props.name });
    this._description = props.description;
    this._category = props.category;
    this._price = props.price;
    this._productOptions = props.productOptions;
    this._stockKeepingUnitProducts = props.stockKeepingUnitProducts;
  }

  get name(): ProductName {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get shopId(): string {
    return this._shopId;
  }

  get category(): Category {
    return this._category;
  }

  get price(): number {
    return this._price;
  }

  get productOptions(): ProductOption[] {
    return this._productOptions;
  }

  get stockKeepingUnitProducts(): StockKeepingUnitProduct[] {
    return this._stockKeepingUnitProducts;
  }

  public changeStock(stockKeepUnitProductId: string, stock: number): void {
    const stockKeepUnitProduct = this._stockKeepingUnitProducts.find(
      (e) => e.id == stockKeepUnitProductId
    );
    if (!stockKeepUnitProduct) throw new Error("not found");
    stockKeepUnitProduct.changeStock(stock);
    this.addDomainEvent(
      new StockChangeEvent(
        stockKeepUnitProduct,
        stock - stockKeepUnitProduct.stock
      )
    );
  }
}
