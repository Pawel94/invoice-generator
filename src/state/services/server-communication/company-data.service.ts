import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CompanyInfo} from "../../model/company-info-model";

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
  private URL = '../assets/backend/data.json';
  private httpClient = inject(HttpClient)

  getCompanyData(): Observable<CompanyInfo> {
    return this.httpClient.get<CompanyInfo>(this.URL).pipe(catchError(err => {
      throw new Error(err)
    }));
  }
}
