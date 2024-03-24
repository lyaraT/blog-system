import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {DatePipe} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzColDirective,
    NzDatePickerComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    ReactiveFormsModule
  ],
  providers: [
  DatePipe
],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent implements OnInit {

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
      mobileNo: [null, Validators.compose([Validators.required])],
      isActive: [true,],
      isAuthenticated: [true,],
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
      this.router.navigate(['/admin/users'])
    }).catch((error) => {
      this.ngxLoader.stop()
    })
  }

}
