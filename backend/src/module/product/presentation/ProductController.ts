import { Request, Response } from "express";
import { TypedRequestBody } from "~/common/infrastructure/ExpressRequest";
import { Category } from "../domain/model/Product/Category";
import { ProductRepository } from "../domain/model/Product/ProductRepository";
import { ShopAuthenticationService } from "../domain/service/ShopAuthenticationService";
import { CookieShopAuthenticationService } from "../infrastructure/authentication/CookieShopAuthenticationService";
import { PrismaGetProductsQueryHandler } from "../infrastructure/query/PrimsaGetProductsQueryHandler";
import { PrismaProductRepository } from "../infrastructure/repository/PrismaProductRepository";
import {
  CreateProductCommand,
  ProductOptions,
  StockKeepingProducts,
} from "../usecase/command/CreateProductCommand";
import { CreateProductCommandHandler } from "../usecase/command/CreateProductCommandHandler";

interface CreateProductBodyParams {
  productName: string;
  productDescription: string;
  category: Category;
  productOptions: ProductOptions;
  stockKeepingProducts: StockKeepingProducts;
}

export class ProductController {
  private productRepository: ProductRepository;
  private shopAuthenticationService: ShopAuthenticationService;

  constructor() {
    this.productRepository = new PrismaProductRepository();
    this.shopAuthenticationService = new CookieShopAuthenticationService();
  }

  public async getProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const usecase = new PrismaGetProductsQueryHandler();
    try {
      const result = await usecase.handle();
      return response.json({ ...result });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      } else {
        throw error;
      }
    }
  }

  public async createProduct(
    request: TypedRequestBody<CreateProductBodyParams>,
    response: Response
  ): Promise<Response> {
    const usecase = new CreateProductCommandHandler(this.productRepository);
    const shop = await this.shopAuthenticationService.shopFrom(request);
    const command = new CreateProductCommand(
      shop.id,
      request.body.productName,
      request.body.productDescription,
      request.body.category,
      request.body.productOptions,
      request.body.stockKeepingProducts
    );
    usecase.handle(command);

    return response.json({ message: "done" });
  }
}
