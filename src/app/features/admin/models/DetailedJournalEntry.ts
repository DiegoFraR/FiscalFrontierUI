import { Credit, Debit } from "./journal-entry.model";

export interface DetailedJournalEntry{
    journalEntryId: number;
    journalEntryType: string;
    journalEntryDescription: string;
    createdBy: string;
    updatedBy: string;
    journalEntryPostReference: string;
    journalEntryStatus: string;
    journalEntryRejectionReasoning?: string;
    chartOfAccountId: number;
    creditValues:  number[];
    debitValues: number[];
    fileUrl?: FileRecord[];
    createdOn: Date;
    updatedOn: Date;
    totalDebitValue: number;
    totalCrebitValue: number;
}
export interface FileRecord{
    id: number;
    fileName: string;
    filePath: string;
}