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
/*
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('FileName', file.name);
    formData.append('FileExtension', file.name.split('.').pop() || '');
    formData.append('file', file);

    return this.http.post('/api/File/upload', formData);
  }
   // Method to approve a journal entry
   approveEntry(entryId: number): Observable<any> {
    return this.http.post(`/api/approve`, { entryId });
  }

  // Method to reject a journal entry
  rejectEntry(entryId: number): Observable<any> {
    return this.http.post(`/api/reject`, { entryId });
  }
  getPendingEntries(): Observable<any[]> {
    return this.http.get<any[]>(`/api/pending`);
  }
*/
  //These are the correct service calls to connect to the API:
  //The TypeScript files of each component need to be modified to make the calls work and not break the entire application. 
  //You will need to import the models that were created to make these calls connect to the API. 

  
  uploadFile(uploadFileRequest: UploadFile): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/File/upload`, uploadFileRequest);
  }

  getFilesByJournalId(journalEntryId: number): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(`${environment.apiBaseUrl}/api/File/${journalEntryId}`)
  }
}
