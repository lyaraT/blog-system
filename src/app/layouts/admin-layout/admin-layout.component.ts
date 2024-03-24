import {Component, OnInit} from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    NzFooterComponent,
    NzBreadCrumbItemComponent,
    NzBreadCrumbComponent,
    NzContentComponent,
    NzIconDirective,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuItemComponent,
    NzSubMenuComponent,
    NzMenuDirective,
    NzSiderComponent,
    RouterOutlet,
    CommonModule,
    RouterLink,
    NzButtonComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  isCollapsed = false;

  user: any

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()
    console.log(this.user.role)
  }


  logout(): void{
    this.authService.logout();
  };
}
