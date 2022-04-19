import { GetProductsQueryHandler } from "../../usecase/query/GetProductsQueryHandler";
import { ProductsView } from "../../usecase/query/view/ProductsView";
import { PrismaQueryHandler } from "./PrismaQueryHandler";

export class PrismaGetProductsQueryHandler
  extends PrismaQueryHandler
  implements GetProductsQueryHandler
{
  public async handle(): Promise<ProductsView> {
    // Get all Products
    const prismaProducts = await this.prisma.products.findMany();

    const products = prismaProducts.map((p) => ({ id: p.id, name: p.name }));

    const productsView = new ProductsView(products);

    return productsView;
  }
}
