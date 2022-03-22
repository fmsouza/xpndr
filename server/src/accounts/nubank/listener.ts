import EventEmitter from "events";
import { Inject, Service } from "typedi";
import { QueueEvent } from "~/shared/types";

import { QUEUE_TOKEN } from "~/tokens";

import { Account } from "../types";

@Service()
export class NubankEventListener {

  public constructor(@Inject(QUEUE_TOKEN) private readonly queue: EventEmitter) {
    this.queue.addListener(QueueEvent.NUBANK_SYNC, this.syncAccount.bind(this));
  }

  private async syncAccount(account: Account): Promise<void> {
    console.log('syncing nubank account:', account);
  }
}