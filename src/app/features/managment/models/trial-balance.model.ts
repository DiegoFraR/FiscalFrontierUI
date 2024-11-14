export interface DebitDetails {
    debitId: number; 
    chartOfAccountId: number; 
    amount: number; 
  }
  
  export interface TrialBalance {
    chartOfAccountId: number; 
    chartOfAccountName?: string; 
    totalDebits: number; 
    totalCredits: number; 
    netBalance: number; 
    debitDetails?: DebitDetails[]; 
  }