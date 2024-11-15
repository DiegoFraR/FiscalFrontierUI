export interface BroadDetailJournalEntry{
    journalEntryId: number;
    journalEntryDescription: string;
    journalEntryType: string;
    journalEntryPostReference: String;
    createdBy: string;
    creditTotal: number;
    debitTotal: number;
    chartOfAccountId: number;
    chartOfAccountName: string;
    fileLink?: string;
    createdOn: Date;
    updatedOn: Date;

}