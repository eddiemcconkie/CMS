import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: string;

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe({
      next: (messages) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (error) => console.log(error),
    });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
    this.http
      .post<{ message: Message }>('http://localhost:3000/messages', message)
      .subscribe(({ message }) => {
        this.messages.push(message);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
