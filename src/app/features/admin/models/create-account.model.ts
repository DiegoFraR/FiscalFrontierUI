export interface CreateAccount{
  accountName: string;
  accountDescription: string,
  accountCategory: string,
  accountSubcategory: string,
  accountInitialBalance: number;
  accountDebit: number,
  accountCredit: number,
  accountStatement: string,
  accountOrder: number,
  accountComment: string,
  userId: string
}