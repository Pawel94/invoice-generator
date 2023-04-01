import {TestBed} from '@angular/core/testing';

import {CompanyDataService} from './company-data.service';
import {CompanyInfo} from "../../model/company-info-model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CompanyDataService', () => {
  let service: CompanyDataService;
  let url = '../assets/backend/data.json';
  let httpController: HttpTestingController;
  const mockData: CompanyInfo =
    {
      "name": "KLG test task",
      "address": "Poland",
      "phones": [
        "123 456 789",
        "789-456-123"
      ]
    }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CompanyDataService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getAllBooks and return an array of Books', () => {
    service.getCompanyData().subscribe((res) => {
      expect(res).toEqual(mockData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockData);
  });

});
