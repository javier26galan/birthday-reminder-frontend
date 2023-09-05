import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdayListComponent } from './bday-list.component';

describe('BdayListComponent', () => {
  let component: BdayListComponent;
  let fixture: ComponentFixture<BdayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdayListComponent]
    });
    fixture = TestBed.createComponent(BdayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
