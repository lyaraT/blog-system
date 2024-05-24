import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSssComponent } from './login-sss.component';

describe('LoginSssComponent', () => {
  let component: LoginSssComponent;
  let fixture: ComponentFixture<LoginSssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
