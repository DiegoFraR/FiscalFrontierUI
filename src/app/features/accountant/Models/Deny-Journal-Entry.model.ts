export interface DenyJournalEntry {
  journalEntryId: number;
  journalEntryDeniedReason: string;
  updatedBy: string | null;
}