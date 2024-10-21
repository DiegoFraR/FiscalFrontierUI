import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../../service/file-upload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() submitForm = new EventEmitter<void>();

  selectedFile: File | null = null;

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        () => {
          alert('File uploaded successfully.');
          this.submitForm.emit();
          this.router.navigate(['/accountant/journal-entries']);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      alert('Please select a file to upload.');
    }
  }
}
