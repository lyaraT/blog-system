import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {BlogService} from "../../core/services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-blog',
  standalone: true,
    imports: [
        DatePipe,
        NgIf,
        NzButtonComponent
    ],
  providers:[DatePipe],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css'
})
export class SingleBlogComponent implements OnInit{

  blogId:any;
  blogData:any;

  constructor(private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,) {
  }
  ngOnInit(): void {

    this.blogId = this.route.snapshot.paramMap.get('id');

      this.blogService.getBlogById(this.blogId).subscribe(
        (res: any) => {
          console.log(res)
          this.blogData = res[0];
        },
        (e: any) => {
          console.log(e)
        },
      );

  }


  navigateToView(): void {
    this.router.navigate(['/homepage'])
  }

}
