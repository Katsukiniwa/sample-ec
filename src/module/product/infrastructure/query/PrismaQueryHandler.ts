import { PrismaClient } from "@prisma/client";

export abstract class PrismaQueryHandler {
  public readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
