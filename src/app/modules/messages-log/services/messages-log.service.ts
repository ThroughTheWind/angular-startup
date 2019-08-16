import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageLog } from '../models/message-log';
import { MessageType } from '../models/message-type';

@Injectable({
  providedIn: 'root'
})
export class MessagesLogService {

  messages: MessageLog[];

  constructor() {
    this.messages = [];
  }

  public getMessages(type: MessageType = null): Observable<MessageLog[]> {
    return of(this.messages).pipe(
      map(messages => {
        if (type) {
          messages = messages.filter(message => message.type === type);
        }
        return messages;
      })
    );
  }

  public addMessage(message: MessageLog): Observable<MessageLog> {
    return new Observable(observer => {
      if (!message) {
        observer.error('Message can\'t be null');
      }
      message.date = new Date();
      if (this.messages.push(message) > 0) {
        this.messages = this.messages.sort((a, b) => b.date.getTime() - a.date.getTime());
        observer.next(message);
      } else {
        observer.error('Message insertion failed');
      }
    });
  }

  public clearMessages(): Observable<boolean> {
    return new Observable(observer => {
      this.messages.splice(0, this.messages.length);
      observer.next(this.messages.length === 0);
    });
  }

  public getSuccessMessages(): Observable<MessageLog[]> {
    return this.getMessages().pipe(
      map(messages => messages.filter(message => message.type === MessageType.SUCCESS))
    );
  }

  public getErrorMessages(): Observable<MessageLog[]> {
    return this.getMessages().pipe(
      map(messages => messages.filter(message => message.type === MessageType.ERROR))
    );
  }

  public getInfoMessages(): Observable<MessageLog[]> {
    return this.getMessages().pipe(
      map(messages => messages.filter(message => message.type === MessageType.INFO))
    );
  }

  public getWarningMessages(): Observable<MessageLog[]> {
    return this.getMessages().pipe(
      map(messages => messages.filter(message => message.type === MessageType.WARNING))
    );
  }

  public getNeutralMessages(): Observable<MessageLog[]> {
    return this.getMessages().pipe(
      map(messages => messages.filter(message => message.type === MessageType.NEUTRAL))
    );
  }

}
