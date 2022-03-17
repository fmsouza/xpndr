import { Account } from "@prisma/client";
import { Service } from "typedi";

import { User } from "../../users/types";
import { AccountsRepository } from "../repositories";

@Service()
export class AccountsService {

  public constructor(private readonly accountsRepository: AccountsRepository) { }

  public async createAccount(input: { title: string, accountTypeId: number, user: User }): Promise<Account> {
    const { title, accountTypeId, user } = input;

    return this.accountsRepository.createAccount({
      title,
      accountTypeId,
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