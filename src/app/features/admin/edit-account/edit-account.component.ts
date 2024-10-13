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
          this.isActive = this.chartOfAccount?.accountActive
          let actualId: number = Number(this.id);
          if(this.id){
            this.chartOfAccountService.getAccountById(actualId)
            .subscribe({
              next: (response) => {
                this.chartOfAccount = response;
              }
            });
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editChartOfAccountSubscription?.unsubscribe();
  }


  // This method will be called when the form is submitted
  onSubmit(form: NgForm) {
    if (form.valid) {
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
          this.router.navigateByUrl('/view-chart-of-account');
        }
      });
    } else {
      console.error('Form is invalid');
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
          this.router.navigateByUrl('/view-chart-of-account');
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
