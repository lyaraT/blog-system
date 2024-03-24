import {Component, OnInit} from '@angular/core';
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzTableComponent, NzTableQueryParams} from "ng-zorro-antd/table";
import {PageSize} from "../../../core/dto/page.size";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {BlogService} from "../../../core/services/blog.service";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-blogs',
  standalone: true,
  imports: [
    NzDropdownMenuComponent,
    NzMenuItemComponent,
    NzMenuDirective,
    NzTableComponent,
    NzButtonComponent,
    NzDividerComponent,
    NzIconDirective,
    NzInputGroupComponent,
    NzCollapsePanelComponent,
    NzCollapseComponent,
    NzDropDownDirective,
    NgForOf,
    DatePipe,
    NzPopconfirmDirective,
    CommonModule,
    NzInputDirective,
    FormsModule
  ],
  templateUrl: './view-blogs.component.html',
  styleUrl: './view-blogs.component.css'
})
export class ViewBlogsComponent implements OnInit {

  pageSize = new PageSize();
  blogData: any[] = [];
  searchValue: any;
  status: any;


  constructor(private blogService: BlogService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPagedBlogs();
  }


  onTableParamsChange(params: NzTableQueryParams): void {
    this.pageSize.pageSize = params.pageSize;
    this.pageSize.pageIndex = params.pageIndex;
    this.getPagedBlogs();
  }


  getPagedBlogs(): void {
    const payload = {
      pageSize: this.pageSize.pageSize,
      pageIndex: this.pageSize.pageIndex,
      filters: {
        searchValue: this.searchValue,
        status: true
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
    this.router.navigate([`/admin/blogs/${id}`])
  }

  accept(data: any): void {
    data.status = true;
    this.blogService.updateBlogs(data).subscribe(()=>{
      this.getPagedBlogs();
    })
  }

  reject(data: any): void {
    data.isActive = false;
    this.blogService.updateBlogs(data).subscribe(()=>{
      this.getPagedBlogs();
    })
  }

  cancel(): void {

  }
}
