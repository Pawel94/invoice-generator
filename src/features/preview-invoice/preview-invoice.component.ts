import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceStateService} from "../../state/services/invoice-state.service";
import {MatTableModule} from "@angular/material/table";
import {PreviewInvoiceTableComponent} from "./preview-invoice-table/preview-invoice-table.component";
import {CompanyDataService} from "../../state/services/server-communication/company-data.service";
import {PreviewInvoiceInfoComponent} from "./preview-invoice-info/preview-invoice-info.component";
import {map} from "rxjs";


@Component({
  standalone: true,
  selector: 'app-preview-invoice',
  imports: [CommonModule, MatTableModule, PreviewInvoiceTableComponent, PreviewInvoiceInfoComponent],
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss']
})
export class PreviewInvoiceComponent implements OnInit {
  private readonly invoiceData = inject(InvoiceStateService);
  private readonly companyData = inject(CompanyDataService);
  selectedInvoiceOption$ = this.invoiceData.selectedInvoiceOption$;
  companyInfoFromServer$ = this.companyData.getCompanyData()
  constructor() {
  }

  ngOnInit(): void {
    this.companyData.getCompanyData()
  }

}
