import { ulid } from "ulid";
import { CommandHandler } from "~/common/usecase/CommandHandler";
import { Product } from "../../domain/model/Product/Product";
import { ProductOption } from "../../domain/model/Product/ProductOption";
import { ProductRepository } from "../../domain/model/Product/ProductRepository";
import { StockKeepingUnitProduct } from "../../domain/model/Product/StockKeepingUnitProduct";
import { CreateProductCommand } from "./CreateProductCommand";

export class CreateProductCommandHandler
  implements CommandHandler<CreateProductCommand>
{
  constructor(private productRepository: ProductRepository) {}

  handle(command: CreateProductCommand): void {
    const stockKeepingUnitProducts = command.stockKeepingProducts.map(
      (s) => new StockKeepingUnitProduct({ id: ulid(), ...s })
    );

    const product = new Product({
      id: ulid(),
      shopId: command.shopId,
      name: command.productName,
      description: command.productDescription,
      category: command.category,
      price: command.price,
      productOptions: command.productOptions.map((o) => new ProductOption(o)),
      stockKeepingUnitProducts,
    });

    this.productRepository.store(product);
  }
}
