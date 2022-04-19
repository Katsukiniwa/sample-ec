import { DomainEvent } from "~/common/domain/events/DomainEvent";
import { StockKeepingUnitProduct } from "../StockKeepingUnitProduct";

/**
 * 在庫変更イベント
 */
export class StockChangeEvent implements DomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly product: StockKeepingUnitProduct;

  /**
   * 在庫の変更数
   * 例. 1個補充されたら+1, 5個購入されたら-5
   */
  public readonly changeValue: number;

  constructor(product: StockKeepingUnitProduct, changeValue: number) {
    this.dateTimeOccurred = new Date();
    this.product = product;
    this.changeValue = changeValue;
  }

  public getAggregateId(): string {
    return this.product.id;
  }
}
