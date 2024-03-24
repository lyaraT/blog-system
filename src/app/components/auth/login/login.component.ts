import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router, RouterLink} from "@angular/router";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective} from "ng-zorro-antd/input";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {UserService} from "../../../core/services/user.service";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzButtonComponent,
    RouterLink,
    NzRowDirective,
    NzFormControlComponent,
    NzInputGroupWhitSuffixOrPrefixDirective,
    NzInputGroupComponent,
    NzIconDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzCardComponent,
    NzColDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzDatePickerComponent,
    NzOptionComponent,
    NzSelectComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }


  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.getRawValue()).then(()=>{
      this.navigateToAdminSection();
    })
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  navigateToAdminSection(): void {
    this.router.navigate(['/admin/blogs/add-edit']);
  }
  navToRegistration(): void {
    this.router.navigate(['/auth/registration']);
  }
}
