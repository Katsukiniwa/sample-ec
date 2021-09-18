import { Product } from "./Product";

export interface ProductRepository {
  store(product: Product): void;
}
