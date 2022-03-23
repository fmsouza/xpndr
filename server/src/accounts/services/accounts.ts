import { Account } from "@prisma/client";
import { Service } from "typedi";

import { User } from "~/users/types";

import { AccountsRepository } from "../repositories";
import { AccountType } from "../types";

@Service()
export class AccountsService {

  public constructor(private readonly accountsRepository: AccountsRepository) { }

  public async createAccount(input: { title: string, accountType: AccountType, user: User }): Promise<Account> {
    const { title, accountType, user } = input;

    return this.accountsRepository.createAccount({
      title,
      accountType,
      ownerId: user.id,
    });
  }

  public async getAccountById(id: number): Promise<Account | null> {
    return this.accountsRepository.getAccountById(id);
  }

  public async getAccountsByUserId(id: number): Promise<Account[]> {
    return this.accountsRepository.getAccountsByUserId(id);
  }

  public async updateAccount(account: Account): Promise<Account> {
    return this.accountsRepository.updateAccount(account);
  }
}