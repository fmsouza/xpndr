import { PrismaClient, AccountType } from "@prisma/client";
import { Inject, Service } from "typedi";

import { InjectionToken } from "../../setup";

@Service()
export class AccountTypesRepository {

  public constructor(@Inject(InjectionToken.PRISMA) private readonly prisma: PrismaClient) { }

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