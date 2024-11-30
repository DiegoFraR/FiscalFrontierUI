import { Component } from '@angular/core';

@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  // Optional: Add logic to handle form submission
  onSubmit(): void {
    if (this.newPassword === this.confirmPassword) {
      console.log('Password successfully reset!');
      // Logic for resetting password or navigating to another screen
    } else {
      console.error('Passwords do not match');
    }
  }
}
