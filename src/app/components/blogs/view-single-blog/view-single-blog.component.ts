import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../core/services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule, DatePipe} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-view-single-blog',
  standalone: true,
  imports: [
    DatePipe,
    NzButtonComponent,
    CommonModule,
    NzIconDirective
  ],
  templateUrl: './view-single-blog.component.html',
  styleUrl: './view-single-blog.component.css'
})
export class ViewSingleBlogComponent implements OnInit{

  blogId:any;
  blogData:any;
  parameter: any;

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute,) {
  }
  ngOnInit(): void {

    this.blogId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params) => {
      this.parameter = params['moderated'];
      console.log(this.parameter)
      this.blogService.getBlogById(this.blogId).subscribe(
        (res: any) => {
          console.log(res)
          this.blogData = res[0];
        },
        (e: any) => {
          console.log(e)
        },
      );
    })

  }


  accept():void {
    this.blogData.status = true;
    this.blogService.updateBlogs(this.blogData).subscribe(()=>{
      this.navigateToView();
    })
  }

  reject():void {
    this.blogData.isActive = false;
    this.blogService.updateBlogs(this.blogData).subscribe(()=>{
      this.navigateToView();
    })
  }

  navigateToView(): void {
    this.router.navigate(['/admin/blogs'])
  }


}
