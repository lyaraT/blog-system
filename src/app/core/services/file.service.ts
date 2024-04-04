import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SETTINGS} from "../constants/common.settings";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}

  // file.service.ts
  postFile(file: any, type: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${SETTINGS.BASE_API}/file/upload`, formData);
  }
}
