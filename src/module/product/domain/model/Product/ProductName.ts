import { ValueObject } from "~/common/domain/ValueObject";

interface ProductNameProps {
  name: string;
}

export class ProductName extends ValueObject<ProductNameProps> {
  constructor(props: ProductNameProps) {
    super(props)

    if (props.name.length > 1000) {
      throw new Error('商品名は1000文字以下で設定してください');
    }
  }
}
