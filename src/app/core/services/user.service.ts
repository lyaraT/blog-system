import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SETTINGS } from '../constants/common.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  createUser(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SETTINGS.BASE_API}/user/create`, payload).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: any) => {
          reject(error.error);
        },
      });
    });
  }
}
