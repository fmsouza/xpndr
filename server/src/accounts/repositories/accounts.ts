import { Account, PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";

import { PRISMA_TOKEN } from "~/tokens";
import { AccountType } from "../types";

@Service()
export class AccountsRepository {

  public constructor(@Inject(PRISMA_TOKEN) private readonly prisma: PrismaClient) { }

  public async createAccount(input: { title: string, accountType: AccountType, ownerId: number }): Promise<Account> {
    return this.prisma.account.create({
      data: {
        title: input.title,
        accountType: input.accountType,
        ownerId: input.ownerId
      },
    });
  }

  public async getAccountById(id: number): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: {
        id
      }
    });
  }

  public async getAccountsByUserId(ownerId: number): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: {
        ownerId
      }
    });
  }

  public async updateAccount(account: Account): Promise<Account> {
    const { id, ...data } = account;
    return this.prisma.account.update({
      where: { id },
      data
    });
  }
}