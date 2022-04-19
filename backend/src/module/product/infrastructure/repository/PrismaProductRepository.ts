import { PrismaClient } from ".prisma/client";
import { Product } from "../../domain/model/Product/Product";
import { ProductRepository } from "../../domain/model/Product/ProductRepository";

export class PrismaProductRepository implements ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async store(product: Product): Promise<void> {
    await this.prisma.products.findUnique({
      where: {
        id: product.id,
      },
    });
  }
}
