import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MessagesLogService } from '../services/messages-log.service';
import { MessageLog } from '../models/message-log';
import { MessageType } from '../models/message-type';
import { nextTick } from 'q';

@Component({
  selector: 'app-messages-log',
  templateUrl: './messages-log.component.html',
  styleUrls: ['./messages-log.component.less']
})
export class MessagesLogComponent implements OnInit {

  localMessages: Observable<MessageLog[]>;
  filterType$: Observable<MessageType>;
  MessageType = MessageType;
  filteredType: MessageType = null;
  constructor(private messagesLogService: MessagesLogService) { }

  get messages() {
    return this.localMessages;
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.localMessages = this.messagesLogService.getMessages()
      .pipe(
        map(messages => this.filteredType ? messages.filter(message => message.type === this.filteredType) : messages)
      );
  }

  filterSuccess() {
    this.filteredType = MessageType.SUCCESS;
    this.getMessages();
  }

  filterError() {
    this.filteredType = MessageType.ERROR;
    this.getMessages();
  }

  filterWarning() {
    this.filteredType = MessageType.WARNING;
    this.getMessages();
  }

  filterInfo() {
    this.filteredType = MessageType.INFO;
    this.getMessages();
  }

  filterNeutral() {
    this.filteredType = MessageType.NEUTRAL;
    this.getMessages();
  }
}
