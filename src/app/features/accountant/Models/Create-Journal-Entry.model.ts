export interface CreateJournalEntry {
  JournalEntryType: string;
  JournalEntryDescription: string;
  CreatedBy: string;
  UpdatedBy: string | null;
  JournalEntryPostReference: string;
  ChartOfAccountId: number;
  CreditValues: number[];
  DebitValues: number[];
}