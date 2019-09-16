import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdOverlayComponent } from './md-overlay.component';

describe('MdOverlayComponent', () => {
  let component: MdOverlayComponent;
  let fixture: ComponentFixture<MdOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
