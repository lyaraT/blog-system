import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SETTINGS} from "../constants/common.settings";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
  ) {}

  createBlog(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/blog/create`, payload);
  }

  getBlogsPaged(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/blog/get-paged`, payload);
  }

  getBlogById(payload: any): Observable<any> {
    return this.http.get(
      `${SETTINGS.BASE_API}/blog/get/${payload}`,
    );
  }

  updateBlogs(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/blog/update`, payload);
  }

  getCustomerBookings(payload: any): Observable<any> {
    return this.http.post(
      `${SETTINGS.BASE_API}/customer/get-bookings`,
      payload,
    );
  }
}
