import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageLog } from '../models/message-log';
import { MessageType } from '../models/message-type';

@Injectable({
  providedIn: 'root'
})
export class MessagesLogService {

  messages: BehaviorSubject<MessageLog[]>;
  dataStore: {
    messages: MessageLog[];
  };

  constructor() {
    this.dataStore = { messages: [] };
    this.messages = new BehaviorSubject([]);
  }

  public getMessages(): Observable<MessageLog[]> {
    return this.messages.asObservable();
  }

  public addMessage(message: MessageLog): Observable<MessageLog> {
    return new Observable(observer => {
      if (!message) {
        observer.error('Message can\'t be null');
      }
      message.date = new Date();

      if (this.dataStore.messages.push(message) > 0) {
        this.dataStore.messages = this.dataStore.messages.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.messages.next(Object.assign({}, this.dataStore).messages);
        observer.next(message);
      } else {
        observer.error('Message insertion failed');
      }
    });
  }

  public clearMessages(): Observable<boolean> {
    return new Observable(observer => {
      this.dataStore.messages.splice(0, this.dataStore.messages.length);
      this.messages.next(Object.assign({}, this.dataStore).messages);
      observer.next(this.dataStore.messages.length === 0);
    });
  }
}
