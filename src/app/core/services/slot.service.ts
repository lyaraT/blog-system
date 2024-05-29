import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SETTINGS} from "../constants/common.settings";

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(
    private http: HttpClient,
  ) {}

  createSlot(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/slot/create`, payload);
  }

  getSlotsPaged(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/slot/get-paged`, payload);
  }

  getSlotById(payload: any): Observable<any> {
    return this.http.get(
      `${SETTINGS.BASE_API}/slot/get/${payload}`,
    );
  }

  updateSlot(payload: any): Observable<any> {
    return this.http.post(`${SETTINGS.BASE_API}/slot/update`, payload);
  }

  deleteSlotById(payload: any): Observable<any> {
    return this.http.delete(
      `${SETTINGS.BASE_API}/slot/delete/${payload}`,
    );
  }

}
