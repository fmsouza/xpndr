import EventEmitter from "events";
import { Inject, Service } from "typedi";
import { QueueEvent } from "~/shared/types";

import { QUEUE_TOKEN } from "~/tokens";

import { Account } from "./types";

@Service()
export class AccountsEventListener {

  public constructor(@Inject(QUEUE_TOKEN) private readonly queue: EventEmitter) {
    this.queue.addListener(QueueEvent.ACCOUNT_SYNC, this.syncAccount.bind(this));
  }

  private async syncAccount(account: Account): Promise<void> {
    switch (account.accountTypeId) {
      case 1: // Nubank
        this.queue.emit(QueueEvent.NUBANK_SYNC, account);
        break;
    }
  }
}