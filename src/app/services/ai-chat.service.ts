import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.x.ai/v1/chat/completion'; // استخدمي الـ proxy path
  private apiKey =
    'xai-Ev4ZiHR38JTzggo20L66FEwKvuURicrw2yRvG3dMrp9MgGebDYlaK4pWGFQSCqhohqjhJmls1f7STFXI'; // حطي الـ API key بتاع xAI

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      prompt: message,
      model: 'grok',
    };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, error) => {
            if (error.status !== 429 || acc >= 2) {
              throw error;
            }
            return acc + 1;
          }, 0),
          delay(5000)
        )
      ),
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to send message to AI'));
      })
    );
  }
}
