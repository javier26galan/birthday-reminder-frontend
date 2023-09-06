import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdayItemDialogComponent } from './bday-item-dialog.component';

describe('BdayItemDialogComponent', () => {
  let component: BdayItemDialogComponent;
  let fixture: ComponentFixture<BdayItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdayItemDialogComponent]
    });
    fixture = TestBed.createComponent(BdayItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
