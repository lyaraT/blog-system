import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratedBlogsComponent } from './moderated-blogs.component';

describe('ModeratedBlogsComponent', () => {
  let component: ModeratedBlogsComponent;
  let fixture: ComponentFixture<ModeratedBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratedBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratedBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
