import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private http: HttpClient) {}

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
}
