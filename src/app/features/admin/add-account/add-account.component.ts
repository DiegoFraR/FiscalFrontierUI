import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  onSubmit(form: NgForm) {
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
        userId: form.value.userId,
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
    }
  }
}
