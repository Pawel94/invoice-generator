import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceStateService} from "../../state/services/invoice-state.service";
import {MatTableModule} from "@angular/material/table";
import {PreviewInvoiceTableComponent} from "./preview-invoice-table/preview-invoice-table.component";


@Component({
  standalone: true,
  selector: 'app-preview-invoice',
  imports: [CommonModule, MatTableModule, PreviewInvoiceTableComponent],
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss']
})
export class PreviewInvoiceComponent implements OnInit {
  private readonly invoiceData = inject(InvoiceStateService);
  selectedInvoiceOption$ = this.invoiceData.selectedInvoiceOption$;
  constructor() {
  }

  ngOnInit(): void {
  }

}
