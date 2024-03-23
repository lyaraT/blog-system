import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzCardComponent} from "ng-zorro-antd/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzFormControlComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzDatePickerComponent,
    NzCardComponent,
    NzRowDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{

  userData: any;
  userForm!: FormGroup;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm(): void {
    this.userForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email]),],
      fullname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      role: [null, Validators.compose([Validators.required])],
      // password: [null, Validators.compose([Validators.required])],
      nic: [null, Validators.compose([Validators.required])],
      dob: [null, Validators.compose([Validators.required])],
      mobileNo: [null, Validators.compose([Validators.required])],
      isActive: [true, Validators.compose([Validators.required])],
    });
  }


  onSubmit(): void {
    // @ts-ignore
    const originalDate = new Date(this.userForm.get('dob').value);
    this.userForm.get('dob')?.patchValue(this.datePipe.transform(originalDate, 'yyyy-MM-dd'));
    console.log(this.userForm.getRawValue())
    this.userService.createUser(this.userForm.getRawValue()).then(()=>{
      console.log(this.userForm.getRawValue())
      this.userForm.reset();
    })
  }

}
