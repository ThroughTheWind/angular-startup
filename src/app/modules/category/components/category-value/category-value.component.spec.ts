import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryValueComponent } from './category-value.component';

describe('CategoryValueComponent', () => {
  let component: CategoryValueComponent;
  let fixture: ComponentFixture<CategoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
