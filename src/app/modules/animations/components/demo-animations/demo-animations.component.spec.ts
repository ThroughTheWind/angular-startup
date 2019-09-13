import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAnimationsComponent } from './demo-animations.component';

describe('DemoAnimationsComponent', () => {
  let component: DemoAnimationsComponent;
  let fixture: ComponentFixture<DemoAnimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoAnimationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
