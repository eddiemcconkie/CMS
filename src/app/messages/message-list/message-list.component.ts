import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      '1',
      'Hey guys',
      'Does anyone have any good jokes?',
      'Eddie McConkie'
    ),
    new Message(
      '2',
      "Here's a question for you",
      'Why do seagulls fly over the sea?',
      'Edward McConaughey'
    ),
    new Message(
      '3',
      'I know!',
      "Because if they flew over the bay, they'd be baygulls",
      'Ed M.'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
