import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApiResponse {
  ip: string
  country_name: string
  state_prov: string
  city: string
  latitude: string
  longitude: string
  time_zone: string
  isp: string
  currency: string
  country_flag?: unknown
}


@Injectable({ providedIn: 'root' })
export class VisitorsService {
  constructor(private http: HttpClient) {}

  getIpAddress() {
    return this.http
      .get<ApiResponse>('https://api.ipify.org/?format=json');
  }

  getGEOLocation(ip: string) : Observable<ApiResponse> {

    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=2e28d9e6df4542bca98ca7994821a5b5&ip=${ip}`;

    return this.http.get<ApiResponse>(url);
  }
}
