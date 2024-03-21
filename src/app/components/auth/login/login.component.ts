import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router, RouterLink} from "@angular/router";
import {NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective} from "ng-zorro-antd/input";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzCardComponent} from "ng-zorro-antd/card";

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
    NzCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
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
    console.log(this.loginForm?.getRawValue());
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }


}
