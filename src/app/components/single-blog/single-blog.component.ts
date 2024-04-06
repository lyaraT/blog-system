import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {BlogService} from "../../core/services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as jsPDF from 'jspdf';
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

  // Method to share the current page on Facebook
  shareOnFacebook() {
    const currentUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(this.blogData.title)}`;
    window.open(facebookUrl, '_blank');
  }

  // Method to share the current page on Twitter
  shareOnTwitter() {
    const currentUrl = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(this.blogData.title)}`;
    window.open(twitterUrl, '_blank');
  }
  // Method to share the current page on LinkedIn
  shareOnLinkedIn() {
    const currentUrl = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(this.blogData.title)}`;
    window.open(linkedInUrl, '_blank');
  }
  downloadBlogPost(): void {
    // Create a temporary link with the blog content and trigger download
    const blob = new Blob([this.blogData.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.blogData.title}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
