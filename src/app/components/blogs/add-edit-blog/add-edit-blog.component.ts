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
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
    ReactiveFormsModule,
    NzPopconfirmDirective
  ],
  templateUrl: './add-edit-blog.component.html',
  styleUrl: './add-edit-blog.component.css'
})
export class AddEditBlogComponent implements OnInit {
  files: any[] = [];
  pdf: any[] = [];
  blogForm!: FormGroup;
  user: any;
  showPdf = false;

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
      imgUrl: [null, ],
      pdfUrl: [null, ],
      club: [null, ],
      authorId: [null, Validators.compose([Validators.required])],
      type: [null, Validators.compose([Validators.required])],
      isActive: [true, Validators.compose([Validators.required])],
      status: [false, Validators.compose([Validators.required])],
    });

    this.blogForm.get('club')?.valueChanges.subscribe((value: any)=>{
      console.log(value)
      if (value === 'SAC') {
        console.log('inside')
        this.showPdf = true
      } else {
        this.showPdf = false;
      }
    })

  }


  submit(): void {
    const user = this.authService.getLoggedInUser();
    this.blogForm.get('author')?.enable();
    this.blogForm.get('imgUrl')?.patchValue(this.files[0].url)
    this.blogForm.get('pdfUrl')?.patchValue(this.pdf[0].url)

    if (user.role === 'Admin'){
      this.blogForm.get('status')?.patchValue(1);
    }

    console.log(this.blogForm.getRawValue())
    this.blogService.createBlog(this.blogForm.getRawValue()).subscribe(()=>{
      this.msg.create('success','Blog Created - Sent for Admin Moderation');
      this.files = [];
      this.pdf = [];
      this.blogForm.reset()
    });
  }

  upload = (item: NzUploadXHRArgs) =>
    this.filesService
      .postFile(item.file, 'NOTES_AND_ATTACHMENT_UPLOAD')
      .subscribe((res) => {
        // this.message.create('success', Attachment has been uploaded!);
        const data = res as any;
        console.log(data);
        if (data) {
          this.files[0] = { url: data.url };
          // this.uploadPointer = true;
          console.log(this.files)
        }
      });

  uploadPdf = (item: NzUploadXHRArgs) =>
    this.filesService
      .postFile(item.file, 'PDF')
      .subscribe((res) => {
        // this.message.create('success', Attachment has been uploaded!);
        const data = res as any;
        console.log(data);
        if (data) {
          this.pdf[0] = { url: data.url };
          // this.uploadPointer = true;
          console.log(this.files)
        }
      });

  confirmRemoveAttachment(attachmentId: any): void {
    this.files.splice(attachmentId, 1);
  }

  confirmRemoveAttachmentPDF(attachmentId: any): void {
    this.pdf.splice(attachmentId, 1);
  }


}
