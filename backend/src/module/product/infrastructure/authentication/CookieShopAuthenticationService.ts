import { TypedRequestCookie } from "~/common/infrastructure/ExpressRequest";
import { Shop } from "../../domain/model/Shop/Shop";
import { ShopAuthenticationService } from "../../domain/service/ShopAuthenticationService";
import { PrismaClient } from ".prisma/client";

export class CookieShopAuthenticationService
  implements ShopAuthenticationService
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async shopFrom(
    request: TypedRequestCookie<{ sessionId: string; rememberToken: string }>
  ): Promise<Shop> {
    const requestSession = request.session;
    if (!requestSession.id) {
      throw new Error("not authorized");
    } else {
      const prismaShop = await this.prisma.shops.findUnique({
        where: {
          id: requestSession.id,
        },
      });
      if (prismaShop == null) {
        throw new Error("shop not found");
      }
      const shop = new Shop({ id: prismaShop.id, name: prismaShop.name });

      return shop;
    }
  }
}
