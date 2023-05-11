import EventEmitter from "events";
import { Inject, Service } from "typedi";

import { QueueEvent } from "~/shared/types";
import { QUEUE_TOKEN } from "~/tokens";
import { AccountTransactionsService, CreditCardTransactionsService } from "~/transactions/services";

import { Account } from "../types";
import { cardTransactionToCreditCardTransaction, debitTransactionToAccountTransaction } from "./mappers";
import { NubankService } from "./service";

@Service()
export class NubankEventListener {

  public constructor(
    @Inject(QUEUE_TOKEN) private readonly queue: EventEmitter,
    private readonly nubankService: NubankService,
    private readonly creditCardTransactionsService: CreditCardTransactionsService,
    private readonly accountTransactionsService: AccountTransactionsService,
  ) {
    this.queue.addListener(QueueEvent.NUBANK_SYNC, this.syncAccount.bind(this));
  }

  private async syncAccount(input: {account: Account, pincode: string}): Promise<void> {
    const { account, pincode } = input;
    console.log(`[account:${account.id}] Syncing nubank account...`);

    const [nubankCardTransactions, nubankAccountTransactions] = await Promise.all([
      this.nubankService.getCreditCardTransactions({account, pincode}),
      this.nubankService.getAccountTransactions({account, pincode})
    ]);

    const newCreditCardTransactions = nubankCardTransactions.map(cardTransactionToCreditCardTransaction(account));
    const newDebitTransactions = nubankAccountTransactions.map(debitTransactionToAccountTransaction(account));

    await Promise.all([
      this.creditCardTransactionsService.bulkCreateCreditCardTransactions(newCreditCardTransactions),
      this.accountTransactionsService.bulkCreateAccountTransactions(newDebitTransactions),
    ]);

    console.log(`[account:${account.id}] Finished syncing nubank successfully!`);
  }
}