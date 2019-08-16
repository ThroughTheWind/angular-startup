import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MessagesLogService } from '../services/messages-log.service';
import { MessageLog } from '../models/message-log';
import { MessageType } from '../models/message-type';

@Component({
  selector: 'app-messages-log',
  templateUrl: './messages-log.component.html',
  styleUrls: ['./messages-log.component.less']
})
export class MessagesLogComponent implements OnInit {

  localMessages: Observable<MessageLog[]>;
  MessageType = MessageType;
  constructor(private messagesLogService: MessagesLogService) { }

  get messages() {
    return this.localMessages;
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(type: MessageType = null) {
    this.localMessages = this.messagesLogService.getMessages();
  }

  filterSuccess() {
    this.getMessages(MessageType.SUCCESS);
  }

  filterError() {
    this.getMessages(MessageType.ERROR);
  }

  filterWarning() {
    this.getMessages(MessageType.WARNING);
  }

  filterInfo() {
    this.getMessages(MessageType.INFO);
  }

  filterNeutral() {
    this.getMessages(MessageType.NEUTRAL);
  }
}
