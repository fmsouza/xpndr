import { CardTransaction, AccountTransaction as DebitTransaction } from "nubank-api";

import { AccountEventType, AccountTransaction, Category, CreditCardTransaction, TransactionMovement } from "~/transactions/types";

import { Account } from "../types";

export function cardTransactionToCreditCardTransaction(account: Account): (trx: CardTransaction) => Omit<CreditCardTransaction, 'id' | 'account'> {
  return (trx: CardTransaction) => ({
    accountId: account.id,
    externalId: trx.id,
    amount: trx.amount,
    installments: trx.details?.charges?.count ?? 1,
    title: trx.description ?? 'Other',
    category: mapNubankCardCategoryToCategory(trx.title),
    isForeign: Boolean(trx.details?.fx?.exchange_rate),
    online: trx.details?.subcategory === 'card_not_present',
    createdAt: new Date(trx.time)
  });
}

export function debitTransactionToAccountTransaction(account: Account): (trx: DebitTransaction) => Omit<AccountTransaction, 'id' | 'account'> {
  return (trx: DebitTransaction) => {
    const accountId = account.id;
    const externalId = trx.id;
    const title = mapTransactionTitle(trx);
    const amount = mapTransactionAmount(trx);
    const type = mapNubankTransactionTypeToEventType(trx.__typename);
    const movement = mapNubankTransactionTypeToMovement(type);

    const [year, month, day] = trx.postDate.split('-');
    const createdAt =  new Date(Number(year), Number(month)-1, Number(day));

    return {
      accountId,
      externalId,
      title,
      type,
      amount,
      movement,
      createdAt,
    };
  };
}

function mapNubankCardCategoryToCategory(category: string): Category {
  switch (category) {
    case 'vestuário': return Category.CLOTHING;
    case 'educação': return Category.EDUCATION;
    case 'eletrônicos': return Category.ELECTRONICS;
    case 'supermercado': return Category.GROCERIES;
    case 'saúde': return Category.HEALTH;
    case 'casa': return Category.HOME;
    case 'lazer': return Category.LEISURE;
    case 'restaurante': return Category.RESTAURANT;
    case 'serviços': return Category.SERVICES;
    case 'transporte': return Category.TRANSPORTATION;
    case 'viagem': return Category.TRAVEL;
    default:
    case 'outros': return Category.OTHERS;
  }
}

function mapNubankTransactionTypeToEventType(type: string): AccountEventType {
  switch (type) {
    case 'BarcodePaymentEvent': return AccountEventType.BARCODE_PAYMENT;
    case 'BillPaymentEvent': return AccountEventType.BILL_PAYMENT;
    case 'DebitPurchaseEvent': return AccountEventType.DEBIT_PURCHASE;
    case 'DebitPurchaseReversalEvent': return AccountEventType.DEBIT_REVERSAL;
    case 'DebitWithdrawalEvent': return AccountEventType.WITHDRAWAL;
    case 'TransferInEvent': return AccountEventType.TRANSFER_RECEIVED;
    case 'TransferOutEvent': return AccountEventType.TRANSFER_SENT;
    case 'TransferOutReversalEvent': return AccountEventType.TRANSFER_SENT_REVERSAL;
    default: return AccountEventType.OTHERS;
  }
}

const TRANSACTION_EVENTS_IN = [AccountEventType.TRANSFER_RECEIVED, AccountEventType.DEBIT_REVERSAL, AccountEventType.TRANSFER_SENT_REVERSAL];

function mapNubankTransactionTypeToMovement(type: AccountEventType): TransactionMovement {
  return TRANSACTION_EVENTS_IN.includes(type) ? TransactionMovement.IN : TransactionMovement.OUT;
}

function mapTransactionTitle(trx: DebitTransaction): string {
  switch (trx.__typename) {
    case 'BarcodePaymentEvent': return [trx.title, trx.detail].join(' - ');

    default:
    case 'BillPaymentEvent':
      return trx.title;

    case 'DebitPurchaseEvent':
    case 'DebitPurchaseReversalEvent':
    case 'TransferOutReversalEvent':
      return trx.detail.split(' - ')[0];

    case 'DebitWithdrawalEvent':
      return [trx.title, trx.detail.split(' - ')[0]].join(' - ');

    case 'TransferInEvent':
      return trx.originAccount?.name ?? trx.title;

    case 'TransferOutEvent':
      return trx.destinationAccount?.name ?? trx.title;
  }
}

function mapTransactionAmount(trx: DebitTransaction): number {
  return Math.ceil((trx.amount ?? Number(trx.detail.substring(trx.detail.indexOf(`$`) + 1).replace(',', '.'))) * 100);
}