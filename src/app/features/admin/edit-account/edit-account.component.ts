import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartOfAccount } from '../models/ChartOfAccount.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOfAccountService } from '../services/chart-of-account.service';
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


  constructor(private route: ActivatedRoute,
    private chartOfAccountService: ChartOfAccountService,
    private router: Router
  ) {
    
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
      // Form is valid, proceed with updating the account data
      console.log('Account updated:', form.value);

      // Here you would typically send the updated account data to a service to save the changes
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
