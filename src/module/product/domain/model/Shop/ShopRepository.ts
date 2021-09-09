import { Shop } from "./Shop";

export interface ShopRepository {
  findById(shopId: string): Shop;
}
