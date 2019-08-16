import { TestBed } from '@angular/core/testing';

import { MessagesLogService } from './messages-log.service';

describe('MessagesLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesLogService = TestBed.get(MessagesLogService);
    expect(service).toBeTruthy();
  });
});
