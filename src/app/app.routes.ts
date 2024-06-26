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
import {RegistrationComponent} from "./components/auth/registration/registration.component";
import {ModeratedBlogsComponent} from "./components/blogs/moderated-blogs/moderated-blogs.component";
import {SingleBlogComponent} from "./components/single-blog/single-blog.component";
import {AuthGuard} from "./core/gaurds/auth.gaurd";
import {ProfileComponent} from "./components/users/profile/profile.component";
import {ViewProfileComponent} from "./components/view-profile/view-profile.component";
import {StudentServiceRequestComponent} from "./components/student-service-request/student-service-request.component";
import { AppointmentsComponent } from './components/appointments/appointments.component';
import {LoginSssComponent} from "./components/auth/login-sss/login-sss.component";
import { SlotAllocationComponent } from './components/student-service-request/slot-allocation/slot-allocation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
  {
    path:'homepage',
    component: HomepageComponent
  },
  {
    path:'student-service',
    component: StudentServiceRequestComponent
  },
  {
    path:'author-profile/:id',
    component: ViewProfileComponent
  },
  {
    path:'single-blog/:id',
    component: SingleBlogComponent
  },
  {
    path: 'auth',
    children:[
      {
        path: 'login',
        component: LoginComponent
      },

       {
        path: 'login-sss',
        component: LoginSssComponent
      },


      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users/moderate',
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
        path: 'users/profile',
        component: ProfileComponent
      },
      {
        path: 'users',
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
        path: 'blogs/moderated',
        component: ModeratedBlogsComponent
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
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'slot-allocation',
        component: SlotAllocationComponent
      },
    ]
  }

];
