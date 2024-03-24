import {Component, OnInit} from '@angular/core';
import {PageSize} from "../../../core/dto/page.size";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {NzTableComponent, NzTableQueryParams} from "ng-zorro-antd/table";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-single-user',
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
  templateUrl: './view-single-user.component.html',
  styleUrl: './view-single-user.component.css'
})
export class ViewSingleUserComponent  implements OnInit {

  pageSize = new PageSize();
  userData: any[] = [];
  searchValue: any;
  status: any;


  constructor(private userService: UserService, private router: Router) {
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
        status: 1,
      }
    }
    this.userService.getUsersPaged(payload).subscribe((res) => {
      this.userData = res.data;
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
    data.isAuthenticated = true;
    this.userService.updateUsers(data).subscribe(()=>{
      this.getPagedBlogs();
    })
  }

  reject(data: any): void {
    data.isActive = false;
    this.userService.updateUsers(data).subscribe(()=>{
      this.getPagedBlogs();
    })
  }

  cancel(): void {

  }
}
