import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotAllocationComponent } from './slot-allocation.component';

describe('SlotAllocationComponent', () => {
  let component: SlotAllocationComponent;
  let fixture: ComponentFixture<SlotAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
