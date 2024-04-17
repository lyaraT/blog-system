import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user:any;
  profileForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,private userService:UserService,
              private message: NzMessageService,) {
  }

  ngOnInit(): void {
    this.initProfileForm();
    this.user = this.authService.getLoggedInUser();
    console.log(this.user)
    this.profileForm.get('iduser')?.patchValue(this.user.userId);
    this.profileForm.get('fullname')?.patchValue(this.user.fullname);
    this.profileForm.get('fullname')?.disable();
    this.profileForm.get('mobileNo')?.patchValue(this.user.mobileNo);
    this.profileForm.get('aboutMe')?.patchValue(this.user.aboutMe);
    this.profileForm.get('email')?.patchValue(this.user.email);
    this.profileForm.get('location')?.patchValue(this.user.location);
  }

  initProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      iduser: [null, Validators.compose([Validators.required])],
      fullname: [null, Validators.compose([Validators.required])],
      aboutMe: [null, Validators.compose([Validators.required])],
      mobileNo: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email]),],
      location: [null, Validators.compose([Validators.required])],
      path: ['norm', Validators.compose([Validators.required])],
    });
  }

  onSubmit(): void {

    // @ts-ignore
    this.user.aboutMe = this.profileForm.get('aboutMe').value;
    // @ts-ignore
    this.user.mobileNo = this.profileForm.get('mobileNo').value;
    // @ts-ignore
    this.user.location = this.profileForm.get('location').value;
    // @ts-ignore
    this.user.email = this.profileForm.get('email').value;
    console.log(this.user);
    this.authService.setLoggedInUser(JSON.stringify(this.user));
    this.userService.updateUsers(this.profileForm.getRawValue()).subscribe(()=>{
      this.message.create('success', 'Profile Updated');
    })
  }

}
