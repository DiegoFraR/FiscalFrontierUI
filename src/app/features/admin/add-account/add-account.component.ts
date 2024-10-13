import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateAccount } from '../models/create-account.model';
import { ChartOfAccountService } from '../services/chart-of-account.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit, OnDestroy {

  userId: string | null = null;
  model: CreateAccount;
  private addChartOfAccountSubscription?: Subscription;

  ngOnInit(): void {
      this.userId = localStorage.getItem('userId');
  }

  ngOnDestroy(): void {
      this.addChartOfAccountSubscription?.unsubscribe();
  }


  constructor(private chartOfAccountService: ChartOfAccountService, private router: Router) {
    this.model = {
      accountName: '',
      accountDescription: '',
      accountCategory: '',
      accountSubcategory: '',
      accountInitialBalance: 0,
      accountDebit: 0,
      accountCredit: 0,
      accountStatement: '',
      accountOrder: 0,
      accountComment: '',
      userId: this.getUserId(),
    }
  }


  private getUserId(): string {
    return localStorage.getItem('userId') || ''; 
  }

  onSubmit(form: NgForm) {
    this.addChartOfAccountSubscription = this.chartOfAccountService.createAccount(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/view-chart-of-account');
      }
    });


    /*
    if (form.valid) {
      // You can now access the form data
      const accountData = {
        accountName: form.value.accountName,
        accountNumber: form.value.accountNumber,
        accountDescription: form.value.accountDescription,
        normalSide: form.value.normalSide,
        accountCategory: form.value.accountCategory,
        accountSubcategory: form.value.accountSubcategory,
        initialBalance: form.value.initialBalance,
        balance: form.value.balance,
        debit: form.value.debit,
        credit: form.value.credit,
        userId: this.userId,
        order: form.value.order,
        statement: form.value.statement,
        comment: form.value.comment
      };
      
      // Perform actions with the account data
      console.log('Form Submitted', accountData);

      // You could send the data to your backend API here, for example
      // this.accountService.addAccount(accountData).subscribe(response => {
      //   console.log('Account added successfully', response);
      // });

    } else {
      console.log('Form is invalid');
    }*/
  }
}
