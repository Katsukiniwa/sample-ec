import { Entity } from "../../../../../common/domain/Entity";

export interface StockKeepingUnitProductProps {
  id: string;
  optionValues: { name: string; value: string }[]
  stock: number;
  price: number;
}

/**
 * @name SKU商品
 * @description 実際に在庫管理する商品
 */
export class StockKeepingUnitProduct extends Entity<StockKeepingUnitProduct> {
  public readonly id: string;
  private _optionValues: { name: string; value: string }[];
  private _stock: number;
  private _price: number;

  constructor(props: StockKeepingUnitProductProps) {
    super();
    this.id = props.id;
    this._optionValues = props.optionValues;
    this._stock = props.stock;
    this._price = props.price;
  }

  get stock(): number {
    return this._stock;
  }

  get price(): number {
    return this._price;
  }

  get optionValues(): { name: string; value: string }[] {
    return this._optionValues;
  }

  public changeStock(newStock: number): void {
    this._stock = newStock;
  }
}
