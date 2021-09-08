import { ValueObject } from "~/common/domain/ValueObject";

interface ProductOptionProps {
  name: string;
  options: string[];
}

/**
 * @name 商品オプション
 * @description 商品が持つオプション
 * 
 * name: サイズ・S/M/L, カラー・White/Black
 * name: 種類, 1月/2月/.../12月
 */
export class ProductOption extends ValueObject<ProductOptionProps> {
  constructor(props: ProductOptionProps) {
    super(props);
  }
}
