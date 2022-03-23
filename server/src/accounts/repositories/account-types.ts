import { AccountType, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";

@Service()
export class AccountTypesRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public async getAccountTypeById(id: number): Promise<AccountType | null> {
    return this.prisma.accountType.findUnique({
      where: {
        id
      }
    });
  }

  public async getAccountTypes(): Promise<AccountType[]> {
    return this.prisma.accountType.findMany();
  }
}