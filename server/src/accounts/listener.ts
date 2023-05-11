import EventEmitter from "events";
import { Inject, Service } from "typedi";
import { QueueEvent } from "~/shared/types";

import { QUEUE_TOKEN } from "~/tokens";

import { Account, AccountType } from "./types";

@Service()
export class AccountsEventListener {

  public constructor(@Inject(QUEUE_TOKEN) private readonly queue: EventEmitter) {
    this.queue.addListener(QueueEvent.ACCOUNT_SYNC, this.syncAccount.bind(this));
  }

  private async syncAccount(input: {account: Account, pincode?: string}): Promise<void> {
    const { account, pincode } = input;
    switch (account.accountType) {
      case AccountType.NUBANK:
        this.queue.emit(QueueEvent.NUBANK_SYNC, {account, pincode});
        break;
    }
  }
}