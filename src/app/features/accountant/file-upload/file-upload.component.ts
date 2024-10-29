import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../service/file-upload.service';
import { UploadFile } from '../Models/Upload-File.model'; // Adjust the import path as necessary

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
  @Output() submitForm = new EventEmitter<void>();

  selectedFile: File | null = null;
  journalEntryId: number = 0; // Set this based on your context

  constructor(
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('journalEntryId');
    if (id) {
      this.journalEntryId = Number (id);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      // Create an UploadFile object
      const uploadFileRequest: UploadFile = {
        file: this.selectedFile,
        journalEntryId: this.journalEntryId // Ensure this is set correctly
      };
        console.log(uploadFileRequest)
      this.fileUploadService.uploadFile(uploadFileRequest).subscribe(
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
