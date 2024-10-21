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

    return this.http.post('/api/file-records', formData);
  }
}
