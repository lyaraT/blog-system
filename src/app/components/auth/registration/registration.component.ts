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
import {DatePipe} from '@angular/common';
import {NzMessageService} from "ng-zorro-antd/message";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

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
  providers: [
    DatePipe
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  userData: any;
  userForm!: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private message: NzMessageService,
              private ngxLoader: NgxUiLoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm(): void {
    this.userForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email]),],
      fullname: [null, Validators.compose([Validators.required, Validators.pattern(/^[^0-9]+$/)])],
      role: [null, Validators.compose([Validators.required])],
      // password: [null, Validators.compose([Validators.required])],
      nic: [null, Validators.compose([Validators.required])],
      dob: [null, Validators.compose([Validators.required])],
      mobileNo: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])], // Mobile number must be exactly 10 digits
      isActive: [true,],
      isAuthenticated: [false,],
    });
  }


  onSubmit(): void {
    // @ts-ignore
    const originalDate = new Date(this.userForm.get('dob').value);
    this.ngxLoader.start();
    this.userForm.get('dob')?.patchValue(this.datePipe.transform(originalDate, 'yyyy-MM-dd'));
    this.userService.createUser(this.userForm.getRawValue()).then(() => {
      this.userForm.reset();
      this.ngxLoader.stop();
      this.router.navigate(['/homepage'])
    }).catch((error) => {
      this.ngxLoader.stop()
    })
  }

}
