import {Component, OnInit} from '@angular/core';
import {PageSize} from "../../../core/dto/page.size";
import {BlogService} from "../../../core/services/blog.service";
import {Router} from "@angular/router";
import {NzTableComponent, NzTableQueryParams} from "ng-zorro-antd/table";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-moderated-blogs',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzDividerComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzPopconfirmDirective,
    NzTableComponent
  ],
  templateUrl: './moderated-blogs.component.html',
  styleUrl: './moderated-blogs.component.css'
})
export class ModeratedBlogsComponent implements OnInit {

  pageSize = new PageSize();
  blogData: any[] = [];
  searchValue: any;
  status: any;
  user:any;

  constructor(private blogService: BlogService, private router: Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()
    console.log(this.user.role)
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
        status: 1,
        type: null
      }
    }
    this.blogService.getBlogsPaged(payload).subscribe((res) => {
      console.log('in')
      console.log(res)
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
    this.router.navigate([`/admin/blogs/${id}`,{moderated:'mod'}])
  }

  delete(data: any): void {
    data.isActive = false;
    this.blogService.updateBlogs(data).subscribe(()=>{
      this.getPagedBlogs();
    })
  }


  cancel(): void {

  }

  sendCredentials(): void {
    this.user
  }

}
