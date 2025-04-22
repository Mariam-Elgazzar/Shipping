import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/ai-chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class ChatComponent implements OnInit {
  userMessage: string = '';
  aiResponse: string = '';

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    console.log('ChatComponent initialized');
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.userMessage).subscribe(
      (response) => {
        // هنا هتضيف الرد من الذكاء الاصطناعي
        this.aiResponse = response.choices[0].text.trim();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
