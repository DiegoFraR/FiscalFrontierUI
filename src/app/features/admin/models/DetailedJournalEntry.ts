import { Credit, Debit } from "./journal-entry.model";

export interface DetailedJournalEntry{
    JournalEntryId: number;
    JournalEntryType: string;
    JournalEntryDescription: string;
    CreatedBy: string;
    UpdatedBy: string;
    JournalEntryPostReference: string;
    JournalEntryStatus: string;
    JournalEntryRejectionReasoning?: string;
    ChartOfAccountId: number;
    CreditValues:  Credit[];
    DebitValues: Debit[];
    FileUrl?: FileRecord[];
    CreatedOn: Date;
    UpdatedOn: Date;
}
export interface FileRecord{
    id: number;
    fileName: string;
    filePath: string;
}