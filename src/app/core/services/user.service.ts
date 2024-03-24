import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SETTINGS } from '../constants/common.settings';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NzMessageService} from "ng-zorro-antd/message";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private message: NzMessageService,) { }

  loggedInUserNameSubject = new BehaviorSubject('');
  loggedInUser = new BehaviorSubject({});

  createUser(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SETTINGS.BASE_API}/user/create`, payload).subscribe({
        next: (response: any) => {
          this.message.create('success', `Account Request has been sent, Once approved an email with credentials will be sent`,{
            nzDuration: 3000 // Set the duration to 5000 milliseconds (5 seconds)
          });
          resolve(response);
        },
        error: (error: any) => {
          console.log(error)
          if(error.error.message) {
            this.message.create('error', `An Account request has already been sent with this email`,{
              nzDuration: 2000 // Set the duration to 5000 milliseconds (5 seconds)
            });
          }
          reject(error.error);
        },
      });
    });
  }
}
