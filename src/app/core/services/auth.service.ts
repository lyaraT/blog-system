import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpClient} from "@angular/common/http";
import {SETTINGS} from "../constants/common.settings";
import {EncryptionService} from "./encryption.service";
import {Subject} from "rxjs";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private message: NzMessageService,private http: HttpClient,private encryption: EncryptionService,
              private userService: UserService, private router: Router) { }

  private loginStatus = new Subject();
  private userId = '';
  login(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SETTINGS.BASE_API}/user/login`, payload).subscribe({
        next: (response: any) => {
          this.message.create('success', `Login Successful`,{
            nzDuration: 3000 // Set the duration to 5000 milliseconds (5 seconds)
          });
          this.setSession(response);
          resolve(response);
        },
        error: (error: any) => {
          this.message.create('error', `${error.error.message}`,{
            nzDuration: 3000 // Set the duration to 5000 milliseconds (5 seconds)
          });
          reject(error.error);
        },
      });
    });
  }

  private setSession(authResult: any): void {
    const { access_token, user } = authResult;
    this.setLoggedInUser(JSON.stringify(user));
    localStorage.setItem(
      SETTINGS.ACCESS_TOKEN,
      this.encryption.encrypt(access_token),
    );
    this.loginStatus.next({ isAuthenticated: true });
    this.userId = user.userId;
  }

  setLoggedInUser(userStr: any): void {
    localStorage.setItem(
      SETTINGS.LOGGED_IN_USER,
      this.encryption.encrypt(userStr),
    );
  }

  getLoggedInUser(): any {
    const userStrEnc: any = localStorage.getItem(SETTINGS.LOGGED_IN_USER);
    return JSON.parse(this.encryption.decrypt(userStrEnc));
  }

  public isLoggedIn(): any {
    if (
      localStorage.getItem(SETTINGS.ACCESS_TOKEN) != null
    ) {
      const tokenENC: any = localStorage.getItem(SETTINGS.ACCESS_TOKEN);
      try {
        return this.encryption.decrypt(tokenENC);
      } catch (e) {
        this.logout();
      }
    }
    return false;
  }

  getToken(): any {
    if (localStorage.getItem(SETTINGS.ACCESS_TOKEN) != null) {
      const tokenENC: any = localStorage.getItem(SETTINGS.ACCESS_TOKEN);

      try {
        return this.encryption.decrypt(tokenENC);
      } catch (e) {
        return '';
      }
    }
    return false;
  }

  logout(): void {
    this.http.post(`${SETTINGS.BASE_API}/user/logout`, {}).subscribe({
      next: () => {
        localStorage.clear();
        this.userService.loggedInUserNameSubject.next('');

        this.router.navigate(['/auth/login']);
      },
      error: () => {
        localStorage.clear();
        this.userService.loggedInUserNameSubject.next('');
        this.router.navigate(['/auth/login']);
      },
    });
  }

}
