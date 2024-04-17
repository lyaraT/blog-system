import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {BlogService} from "../../core/services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import jsPDF from 'jspdf';
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
export class SingleBlogComponent implements OnInit {

  blogId: any;
  blogData: any;

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

  navToAuthorProfile(): void {
    this.router.navigate([`/author-profile/${this.blogData.authorId}`])
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
    const blob = new Blob([this.blogData.content], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.blogData.title}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  generatePDF(): void {
    const doc = new jsPDF();

    // Set initial y position
    let y = 20;

    // Add title
    doc.setFontSize(20);
    doc.text(this.blogData.title, 10, y);
    y += 10; // Increase y position for spacing

    // Add image
    const img = new Image();
    img.src = 'assets/images/whats-university-like-accepted-students.jpg'; // CHANGE LATER
    img.onload = () => {
      const width = 180; //  image width
      const height = img.height * (width / img.width); // Calculate proportional height

      doc.addImage(img, 'JPEG', 10, y, width, height); // Add image
      y += height + 10; // Increase y position for spacing

      // Add content
      doc.setFontSize(12);
      const contentLines = doc.splitTextToSize(this.blogData.content, 170); //width of content
      const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
      contentLines.forEach((line: string) => {
        doc.text(line, 10, y); // Add each line of content
        y += lineHeight; // Increase y position by line height
      });

      // Save PDF
      doc.save(`${this.blogData.title}.pdf`);
    };
  }}
