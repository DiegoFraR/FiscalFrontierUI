export interface BroadDetailJournalEntry{
    JournalEntryID: number;
    JournalEntryDescription: string;
    JournalEntryType: string;
    CreatedBy: string;
    CreditTotal: number;
    DebitTotal: number;
    ChartOfAccountId: number;
    ChartOfAccountName: string;
    FileLink?: string;
    CreatedOn: Date;
    UpdatedOn: Date;

}