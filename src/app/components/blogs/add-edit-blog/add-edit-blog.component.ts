import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileService} from "../../../core/services/file.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BlogService} from "../../../core/services/blog.service";
import {AuthService} from "../../../core/services/auth.service";
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

  constructor(private msg: NzMessageService, private filesService: FileService
    , private formBuilder: FormBuilder, private blogService: BlogService,
              private authService : AuthService) {
  }

  uploadedImageUrl: string | null = null;

  ngOnInit(): void {
    this.initBlogForm();
  }

  initBlogForm(): void {
    this.blogForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      subTopic: [null, Validators.compose([Validators.required])],
      content: [null, Validators.compose([Validators.required])],
      // password: [null, Validators.compose([Validators.required])],
      author: [null, Validators.compose([Validators.required])],
      imgUrl: [null],
      type: [null, Validators.compose([Validators.required])],
      isActive: [true, Validators.compose([Validators.required])],
      status: [false, Validators.compose([Validators.required])],
    });
  }


  submit(): void {
    const user = this.authService.getLoggedInUser();

    if (user.role === 'Admin'){
      this.blogForm.get('status')?.patchValue(1);
    }

    console.log(this.blogForm.getRawValue())
    this.blogService.createBlog(this.blogForm.getRawValue()).subscribe(()=>{
      this.msg.create('success','Blog Created - Sent for Admin Moderation');
      this.blogForm.reset()
    });
  }

  private push: any;
  upload = (item: NzUploadXHRArgs): (item: NzUploadXHRArgs) => void => {
    return (item: NzUploadXHRArgs): void => {
      this.filesService.postFile(item.file, "FILE").subscribe(
        (res: any) => {
          const data = res;
          console.log(data);
          if (data.imageUrl) {
            this.uploadedImageUrl = data.imageUrl; // Update the URL
          }
        },
        (error: any) => {
          console.error('Error uploading file:', error);
        }
      );
    };
  };


}
