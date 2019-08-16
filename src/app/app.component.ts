import { Component } from '@angular/core';
import { MessagesLogService } from './modules/messages-log/services/messages-log.service';
import {
  successTextMessageLog,
  errorTextMessageLog,
  warningTextMessageLog,
  infoTextMessageLog,
  neutralTextMessageLog } from './modules/messages-log/models/message-log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private messagesLogService: MessagesLogService) {

  }
  title = 'startup-angular';

  addSuccessMessage() {
    const message = successTextMessageLog('Test success title', 'Test success text');
    this.messagesLogService.addMessage(message).subscribe(() => console.log('Added !'));
  }

  addErrorMessage() {
    const message = errorTextMessageLog('Test error title', 'Test error text');
    this.messagesLogService.addMessage(message).subscribe(() => console.log('Added !'));
  }

  addWarningMessage() {
    const message = warningTextMessageLog('Test warning title', 'Test warning text');
    this.messagesLogService.addMessage(message).subscribe(() => console.log('Added !'));
  }

  addInfoMessage() {
    const message = infoTextMessageLog('Test info title', 'Test info text');
    this.messagesLogService.addMessage(message).subscribe(() => console.log('Added !'));
  }

  addNeutralMessage() {
    const message = neutralTextMessageLog('Test neutral title', 'Test neutral text');
    this.messagesLogService.addMessage(message).subscribe(() => console.log('Added !'));
  }

  clearMessages() {
    this.messagesLogService.clearMessages().subscribe(() => console.log('Cleaned'));
  }
}
