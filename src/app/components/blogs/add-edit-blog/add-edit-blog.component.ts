import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileService} from "../../../core/services/file.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BlogService} from "../../../core/services/blog.service";

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
    , private formBuilder: FormBuilder, private blogService: BlogService) {
  }

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
      isActive: [true,],
      status: [false,],
    });
  }


  submit(): void {
    this.blogService.createBlog(this.blogForm.getRawValue()).subscribe(()=>{
      this.msg.create('success','Blog Created - Sent for Admin Moderation');
      this.blogForm.reset()
    });
  }

  upload = (item: NzUploadXHRArgs) =>
    this.filesService
      .postFile(item.file, "FILE")
      .subscribe((res: any) => {
        // this.message.create('success', `Attachment has been uploaded!`);
        const data = res as any;
        console.log(data);
        if (data) {
          this.file.push({name: item.file.name, url: data.url});
        }
      });



}
