import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/completions';  // تأكدي إن الـ URL صح
  private apiKey = '..'; // الـ API Key

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      model: 'text-davinci-003',  // النموذج المستخدم هنا ممكن تغييره
      prompt: message,
      max_tokens: 150,
      temperature: 0.7,
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
