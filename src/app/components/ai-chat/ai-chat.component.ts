import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/ai-chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ChatComponent implements OnInit {
  userMessage: string = '';
  messages: { text: string; isUser: boolean }[] = [];
  errorMessage: string = '';
  isSending: boolean = false;

  constructor(private chatService: ChatService) {}

  private messageSubject = new Subject<string>();

  ngOnInit(): void {
    console.log('ChatComponent initialized');
    this.messageSubject
      .pipe(debounceTime(2000))
      .subscribe(() => this.sendMessage());
  }

  sendMessage(): void {
    if (this.isSending) {
      this.errorMessage = 'Please wait, a message is already being sent.';
      return;
    }

    if (this.userMessage.trim()) {
      this.isSending = true;
      this.messages.push({ text: this.userMessage, isUser: true });
      this.errorMessage = '';

      this.chatService.sendMessage(this.userMessage).subscribe({
        next: (response) => {
          this.messages.push({
            text: response.text.trim(), // Adjust based on xAI API response structure
            isUser: false,
          });
          this.userMessage = '';
          this.isSending = false;
        },
        error: (error) => {
          this.errorMessage =
            'Rate limit exceeded or API error. Please wait a moment and try again.';
          console.error('Error:', error);
          this.isSending = false;
        },
      });
    }
  }

  triggerSend(): void {
    this.messageSubject.next(this.userMessage);
  }
}
