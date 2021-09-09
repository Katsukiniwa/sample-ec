import { Category } from "../../domain/model/Product/Category";

type Options = { name: string; options: string[] }[];
type stockKeepingProducts = { name: string, price: number, stock: number, optionValues: { name: string, value: string }[] }[]

export class CreateProductCommand {
  constructor(
    public shopId: string,
    public productName: string,
    public category: Category,
    /**
     * options = [{ name: 'カラー', value: ['黒', '白'] }, { name: 'サイズ', value: ['S', 'M', 'L'] }]
     */
    public options: Options,
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
    public stockKeepingProducts: stockKeepingProducts,
  ) {}
}
