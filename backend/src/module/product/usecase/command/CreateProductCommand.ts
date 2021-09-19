import { Category } from "../../domain/model/Product/Category";

export type ProductOptions = { name: string; options: string[] }[];
export type StockKeepingProducts = { name: string, price: number, stock: number, optionValues: { name: string, value: string }[] }[]

export class CreateProductCommand {
  public shopId: string;
  public productName: string;
  public category: Category;
  
  /**
   * options = [{ name: 'カラー', value: ['黒', '白'] }, { name: 'サイズ', value: ['S', 'M', 'L'] }]
   */
  public productOptions: ProductOptions;
  
  /**
   * stockKeepingProducts = [
   *  { price: 1000, stock: 250, optionValues: [{ name: 'カラー', value: '黒' }, { name: 'サイズ', value: 'S' }] }
   *  { price: 1000, stock: 250, optionValues: [{ name: 'カラー', value: '白' }, { name: 'サイズ', value: 'S' }] }
   *  { price: 1200, stock: 300, optionValues: [{ name: 'カラー', value: '黒' }, { name: 'サイズ', value: 'M' }] }
   *  { price: 1200, stock: 300, optionValues: [{ name: 'カラー', value: '白' }, { name: 'サイズ', value: 'M' }] }
   *  { price: 1500, stock: 350, optionValues: [{ name: 'カラー', value: '黒' }, { name: 'サイズ', value: 'L' }] }
   *  { price: 1500, stock: 350, optionValues: [{ name: 'カラー', value: '白' }, { name: 'サイズ', value: 'L' }] }
   * ]
   */
  public stockKeepingProducts: StockKeepingProducts;

  constructor(
    shopId: string,
    productName: string,
    category: Category,
    productOptions: ProductOptions,
    stockKeepingProducts: StockKeepingProducts
  ) {
    this.shopId = shopId;
    this.productName = productName;
    this.category = category;
    this.productOptions = productOptions;
    this.stockKeepingProducts = stockKeepingProducts;
  }
}