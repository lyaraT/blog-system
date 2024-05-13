import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SETTINGS} from "../constants/common.settings";

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(
    private http: HttpClient,
  ) {}

  createResponse(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/response/create`, payload);
  }

  getResponsesPaged(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/response/get-paged`, payload);
  }
  getResponsesByDate(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/response/get-by-date`, payload);
  }
}
