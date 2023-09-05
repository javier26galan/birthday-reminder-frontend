import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdayItemComponent } from './bday-item.component';

describe('BdayItemComponent', () => {
  let component: BdayItemComponent;
  let fixture: ComponentFixture<BdayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdayItemComponent]
    });
    fixture = TestBed.createComponent(BdayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
