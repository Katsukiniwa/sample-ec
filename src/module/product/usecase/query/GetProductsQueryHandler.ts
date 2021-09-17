import { ProductsView } from "./view/ProductsView";

export interface GetProductsQueryHandler {
  handle(): Promise<ProductsView>;
}
