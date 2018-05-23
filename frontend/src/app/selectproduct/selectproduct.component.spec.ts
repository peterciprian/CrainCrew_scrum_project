import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectproductComponent } from './selectproduct.component';

describe('SelectproductComponent', () => {
  let component: SelectproductComponent;
  let fixture: ComponentFixture<SelectproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
