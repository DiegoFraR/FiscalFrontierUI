import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFile } from '../accountant/Models/Upload-File.model'; // Adjust the import path as necessary
import { environment } from 'src/environments/environment';
import { FileRecord } from '../admin/models/journal-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(uploadFileRequest: UploadFile): Observable<void> {
    const formData = new FormData();
    formData.append('File', uploadFileRequest.file, uploadFileRequest.file.name);
    formData.append('JournalEntryId', uploadFileRequest.journalEntryId.toString());

    return this.http.post<void>(`${environment.apiBaseUrl}/api/File/upload`, formData);
  }

  getFilesByJournalId(journalEntryId: number): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(`${environment.apiBaseUrl}/api/File/${journalEntryId}`);
  }
}
