import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuButtonComponent } from './user-menu-button.component';

describe('UserMenuButtonComponent', () => {
  let component: UserMenuButtonComponent;
  let fixture: ComponentFixture<UserMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
