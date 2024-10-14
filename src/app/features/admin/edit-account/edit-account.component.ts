import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartOfAccount } from '../models/ChartOfAccount.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOfAccountService } from '../services/chart-of-account.service';
import { EditChartOfAccount } from '../models/Update-Account.model';
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit, OnDestroy {
  @Input() account: any;

  id: string | null = null;
  isActive: boolean | undefined;
  paramsSubscription?: Subscription;
  editChartOfAccountSubscription?: Subscription;
  chartOfAccount?: ChartOfAccount;
  editAccountModel: EditChartOfAccount;


  constructor(private route: ActivatedRoute,
    private chartOfAccountService: ChartOfAccountService,
    private router: Router
  ) {
    this.editAccountModel = {
      accountId: this.convertIdToNumber(),
      accountName: '',
      accountDescription: '',
      accountCategory: '',
      accountSubcategory: '',
      accountComment: '',
      accountStatement: '',
      accountCredit: 0,
      accountDebit: 0,
      accountOrder: 0
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        let actualId: number = Number(this.id);
        if (this.id) {
          this.chartOfAccountService.getAccountById(actualId)
            .subscribe({
              next: (response) => {
                this.chartOfAccount = response;
                console.log('Chart of Account Response:', this.chartOfAccount); // Check full response
                this.isActive = this.chartOfAccount?.accountActive ?? false;
                console.log('Account Active Status:', this.isActive); // Check isActive value
              },
              error: (err) => {
                console.error('Error fetching account data', err);
              }
            });
        }
      }
    });
  }
  

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editChartOfAccountSubscription?.unsubscribe();
  }


  // This method will be called when the form is submitted
  onSubmit(form: NgForm) {
    console.log('Save Changes button clicked'); // Debug log
    if (form.valid) {
      // Rest of the logic
      this.editAccountModel.accountName = form.value.accountName;
      this.editAccountModel.accountDescription = form.value.accountDescription;
      this.editAccountModel.accountCategory = form.value.accountCategory;
      this.editAccountModel.accountSubcategory = form.value.accountSubcategory;
      this.editAccountModel.accountComment = form.value.accountComment;
      this.editAccountModel.accountDebit = form.value.accountDebit;
      this.editAccountModel.accountCredit = form.value.accountCredit;
      this.editAccountModel.accountId = this.convertIdToNumber();
      this.editAccountModel.accountOrder = form.value.accountOrder;
      this.editChartOfAccountSubscription = this.chartOfAccountService.editChartOfAccount(this.editAccountModel)
        .subscribe({
          next: (response) => {
            console.log('Account updated successfully', response); // Debug log for success
            this.router.navigateByUrl('/view-chart-of-account');
          },
          error: (err) => {
            console.error('Error updating account', err); // Debug log for errors
          }
        });
    } else {
      console.error('Form is invalid'); // Debug log for invalid form
    }
  }
  

  convertIdToNumber(): number{
    return Number(this.id);
  }

  onDeactivate(): void {
    if(this.id){
      this.chartOfAccountService.deactivateAccount(this.convertIdToNumber())
      .subscribe({
        next: (response) =>{
          console.log('Account deactivated successfully', response);
          this.router.navigateByUrl('/view-chart-of-account');
        },
        error: (err) => {
          console.error('Error deactivating account', err); // Debug log
        }
      });
    }
  }

  onActivate(): void {
    if(this.id){
      this.chartOfAccountService.activateAccount(this.convertIdToNumber())
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/view-chart-of-account');
        }
      });
    }
  }
}
