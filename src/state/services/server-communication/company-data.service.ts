import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyInfo} from "../../model/company-info-model";

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
  private URL = '../assets/backend/data.json';
  private httpClient = inject(HttpClient)

  constructor() {
  }


  getCompanyData(): Observable<CompanyInfo> {
    return this.httpClient.get<CompanyInfo>(this.URL);
  }
}
