import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ErrorMessage {
  errorMessageId: number;
  errorMessage: string;
  errorMessageCategry: string;
}
@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private apiUrl = '/api/ErrorMessages';

  constructor(private http: HttpClient) {}

  // Get all error messages
  getAllErrorMessages(): Observable<ErrorMessage[]> {
    return this.http.get<ErrorMessage[]>(this.apiUrl);
  }

  // Get error messages by category
  getErrorMessagesByCategory(category: string): Observable<ErrorMessage[]> {
    return this.http.get<ErrorMessage[]>(`${this.apiUrl}/category/${category}`);
  }

  // Get a specific error message by ID
  getErrorMessageById(id: number): Observable<ErrorMessage> {
    return this.http.get<ErrorMessage>(`${this.apiUrl}/${id}`);
  }
}
