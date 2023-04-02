import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CompanyInfo} from "../../model";
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
  private httpClient = inject(HttpClient)

  getCompanyData(): Observable<CompanyInfo> {
    return this.httpClient.get<CompanyInfo>(environment.apiUrl).pipe(catchError(err => throwError(err)));
  }
}
