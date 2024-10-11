import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  @Input() account: any;

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
}
