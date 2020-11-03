import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const incomes = this.transactions.filter(transaction => transaction.type === 'income');
    const outcomes = this.transactions.filter(transaction => transaction.type === 'outcome');

    const balance = {
      income: incomes.reduce((total, income) => {
        return total + income.value
      }, 0),
      outcome: outcomes.reduce((total, outcome) => {
        return total + outcome.value
      }, 0),
      total: 0
    };

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
