export interface BroadDetailJournalEntry{
    journalEntryID: number;
    journalEntryDescription: string;
    journalEntryType: string;
    createdBy: string;
    creditTotal: number;
    debitTotal: number;
    chartOfAccountId: number;
    chartOfAccountName: string;
    fileLink?: string;
    createdOn: Date;
    updatedOn: Date;

}