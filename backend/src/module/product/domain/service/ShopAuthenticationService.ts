import { Request } from "express";
import { Shop } from "../model/Shop/Shop";

export interface ShopAuthenticationService {
  shopFrom(request: Request): Promise<Shop>;
}
