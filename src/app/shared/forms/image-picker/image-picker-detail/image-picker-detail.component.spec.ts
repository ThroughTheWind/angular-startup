import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePickerDetailComponent } from './image-picker-detail.component';

describe('ImagePickerDetailComponent', () => {
  let component: ImagePickerDetailComponent;
  let fixture: ComponentFixture<ImagePickerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePickerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePickerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
