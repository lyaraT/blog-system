import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {Router} from "@angular/router";
import {PageSize} from "../../core/dto/page.size";
import {BlogService} from "../../core/services/blog.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {FormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NzCarouselComponent, NzCarouselContentDirective, NzPaginationComponent, FormsModule, NzButtonComponent, NzIconDirective, NzInputDirective, NzInputGroupComponent, NzSelectComponent, NzOptionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  pageSize = new PageSize();
  blogData: any[] = [];
  searchValue: any;
  status: any;
  blogs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  type = null;

  filterOptions = [
    {label:'All Blogs',value:null},
    {label:'Business Faculty',value:'BUSINESS '},
    {label:'It Faculty',value:'IT '},
    {label:'Law Faculty',value:'LAW '}
    ]

  constructor(private blogService: BlogService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPagedBlogs();
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
  navigateToLoginsss(): void {
    this.router.navigate(['/auth/login-sss']);
  }
  getFiltered(): void {
    this.getPagedBlogs();
  }


  getPagedBlogs(): void {
    const payload = {
      pageSize: this.pageSize.pageSize,
      pageIndex: this.pageSize.pageIndex,
      filters: {
        searchValue: this.searchValue,
        status: 1,
        type: this.type
      }
    }
    this.blogService.getBlogsPaged(payload).subscribe((res) => {
      this.blogData = res.data;
      this.pageSize.length = res.total;
    });

  }

  resetSearch(): void {
    this.searchValue = null;
    this.getPagedBlogs();
  }

  search(): void {
    this.getPagedBlogs();
  }

  navToSingle(id: any): void {
    this.router.navigate([`/single-blog/${id}`])
  }
//Declare variables for carousel
  images : string[]=[
    'assets/images/c1.jpg',
    'assets/images/c2.jpg',
    'assets/images/c3.jpg',
  ];
  overlayTexts: string[] = [
    'Discover Endless Knowledge within our Library',
    'Undergo Legal Practice in Action with our own Moot Court',
    'Unleash Innovation at the State-of-the-Art Computer Lab',
  ];
}

