import { Service } from "typedi";

import { AccountTypesRepository } from "../repositories";
import { AccountType } from "../types";

@Service()
export class AccountTypesService {

  public constructor(private readonly accountTypesRepository: AccountTypesRepository) { }

  public async getAccountTypeById(id: number): Promise<AccountType | null> {
    return this.accountTypesRepository.getAccountTypeById(id);
  }

  public async getAccountTypes(): Promise<AccountType[]> {
    return this.accountTypesRepository.getAccountTypes();
  }
}