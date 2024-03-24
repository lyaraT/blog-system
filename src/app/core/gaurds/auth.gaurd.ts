import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";



@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      console.log('inside')
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
