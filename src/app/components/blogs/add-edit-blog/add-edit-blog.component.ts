import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileService} from "../../../core/services/file.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BlogService} from "../../../core/services/blog.service";
import {AuthService} from "../../../core/services/auth.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';

import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-blog.component.html',
  styleUrl: './add-edit-blog.component.css'
})
export class AddEditBlogComponent implements OnInit {
  file: any;
  blogForm!: FormGroup;
  user: any;


  constructor(private msg: NzMessageService, private filesService: FileService
    , private formBuilder: FormBuilder, private blogService: BlogService,
              private authService : AuthService) {
  }

  uploadedImageUrl: string | null = null;

  ngOnInit(): void {
    this.initBlogForm();
    this.user = this.authService.getLoggedInUser();
    this.blogForm.get('author')?.patchValue(`${this.user.fullname} (${this.user.role})`)
    this.blogForm.get('authorId')?.patchValue(this.user.userId)
    this.blogForm.get('author')?.disable()
  }

  initBlogForm(): void {
    this.blogForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      subTopic: [null, Validators.compose([Validators.required])],
      content: [null, Validators.compose([Validators.required])],
      // password: [null, Validators.compose([Validators.required])],
      author: [null, Validators.compose([Validators.required])],
      authorId: [null, Validators.compose([Validators.required])],
      imgUrl: [null],
      type: [null, Validators.compose([Validators.required])],
      isActive: [true, Validators.compose([Validators.required])],
      status: [false, Validators.compose([Validators.required])],
    });
  }


  submit(): void {
    const user = this.authService.getLoggedInUser();
    this.blogForm.get('author')?.enable()

    if (user.role === 'Admin'){
      this.blogForm.get('status')?.patchValue(1);
    }

    console.log(this.blogForm.getRawValue())
    this.blogService.createBlog(this.blogForm.getRawValue()).subscribe(()=>{
      this.msg.create('success','Blog Created - Sent for Admin Moderation');
      this.blogForm.reset()
    });
  }




}
