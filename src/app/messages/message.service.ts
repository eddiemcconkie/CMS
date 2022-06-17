import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: string;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http
      .get<Message[]>(
        'https://wdd430-cms-7118c-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe({
        next: (messages) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error) => console.log(error),
      });
  }

  storeMessages() {
    this.http
      .put(
        'https://wdd430-cms-7118c-default-rtdb.firebaseio.com/messages.json',
        this.messages
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId() {
    return this.messages.reduce(
      (maxId, document) => (+document.id > +maxId ? document.id : maxId),
      '0'
    );
  }

  getNextId() {
    this.maxMessageId = `${+this.maxMessageId + 1}`;
    return this.maxMessageId;
  }
}
