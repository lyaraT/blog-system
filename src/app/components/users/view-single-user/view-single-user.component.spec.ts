import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleUserComponent } from './view-single-user.component';

describe('ViewSingleUserComponent', () => {
  let component: ViewSingleUserComponent;
  let fixture: ComponentFixture<ViewSingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSingleUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
