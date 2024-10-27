import { ChartOfAccount } from "./ChartOfAccount.model";
export class JournalEntry {
    journalEntryId!: number;
    journalEntryType!: string;
    journalEntryDescription!: string;
    createdBy!: string;
    updatedBy!: string;
    journalEntryPostReference!: string;
    journalEntryStatus?: string; // Optional, default: "Pending"
    journalEntryRejectionReasoning?: string;
    chartOfAccountId!: number;
    account!: ChartOfAccount;
    debits!: Debit[];
    credits!: Credit[];
    files?: FileRecord[];
    journalEntryCreated!: Date;
    journalEntryUpdated!: Date;
    
}
export interface Debit {
    id: number;
    accountName: string;
    amount: number;
 
  }
  export interface Credit {
    id: number;
    accountName: string;
    amount: number;
  }
  export interface FileRecord {
    id: number;
    fileName: string;
    filePath: string;
   
  }