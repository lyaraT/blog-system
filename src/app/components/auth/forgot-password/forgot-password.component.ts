import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzCardComponent} from "ng-zorro-antd/card";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NzButtonComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzInputGroupComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormDirective,
    NzCardComponent,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  passwordRecoveryForm!: FormGroup;
  flag: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.initRecoveryForm();
  }

  initRecoveryForm(): void {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
    });
  }

  submitForm(): void {
    if (this.passwordRecoveryForm.valid) {
      console.log(this.passwordRecoveryForm.getRawValue())
    }
  }


}
