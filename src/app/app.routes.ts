import { Routes } from '@angular/router';
import {ViewUsersComponent} from "./components/users/view-users/view-users.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AddEditUserComponent} from "./components/users/add-edit-user/add-edit-user.component";
import {ViewSingleUserComponent} from "./components/users/view-single-user/view-single-user.component";
import {ViewBlogsComponent} from "./components/blogs/view-blogs/view-blogs.component";
import {AddEditBlogComponent} from "./components/blogs/add-edit-blog/add-edit-blog.component";
import {ViewSingleBlogComponent} from "./components/blogs/view-single-blog/view-single-blog.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ViewComponent} from "./components/contactUs/view/view.component";
import {ViewSingleComponent} from "./components/contactUs/view-single/view-single.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";

export const routes: Routes = [


  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path: 'auth',
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: LoginComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users',
        component: ViewUsersComponent
      },
      {
        path: 'users/add-edit',
        component: AddEditUserComponent
      },
      {
        path: 'users/add-edit',
        component: AddEditUserComponent
      },
      {
        path: 'users/:id',
        component: ViewSingleUserComponent
      },
      {
        path: 'blogs',
        component: ViewBlogsComponent
      },
      {
        path: 'blogs/add-edit',
        component: AddEditBlogComponent
      },
      {
        path: 'blogs/add-edit',
        component: AddEditBlogComponent
      },
      {
        path: 'blogs/:id',
        component: ViewSingleBlogComponent
      },
      {
        path: 'contact-us',
        component: ViewComponent
      },
      {
        path: 'contact-us/:id',
        component: ViewSingleComponent
      },
    ]
  }

];