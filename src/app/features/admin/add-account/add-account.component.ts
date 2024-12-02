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
  error: string | null = null;

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
    this.error = null;
    this.addChartOfAccountSubscription = this.chartOfAccountService.createAccount(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/view-chart-of-account');
      },
      error : (response) => {
        this.error = response.message;
        console.error('A account with that name already exists, please enter a new name', response.message);
      }
      }
    );
  }
}
