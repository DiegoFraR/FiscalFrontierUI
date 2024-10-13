export interface ChartOfAccount {
  accountId: number,
  accountName: string,
  accountNumber: number,
  accountDescription: string,
  accountNormalSide: string,
  accountCategory: string,
  accountSubcategory: string,
  accountInitialBalance: number,
  accountDebit: number,
  accountCredit: number,
  accountBalance: number,
  accountDateTimeAdded: Date,
  accountUserId: string,
  accountOrder: number,
  accountStatement: string,
  accountComment: string, 
  accountActive: boolean
}