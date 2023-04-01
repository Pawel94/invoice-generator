import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Invoice} from "../../../state/model/invoice-model";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-preview-invoice-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './preview-invoice-table.component.html',
  styleUrls: ['./preview-invoice-table.component.scss']
})
export class PreviewInvoiceTableComponent {

  @Input() selectedInvoiceOption?: Invoice[]

  displayedColumns: string[] = ['position', 'name', 'count', 'price'];

  getAmountPrice(data: Invoice[]): number {
    return data.reduce((acc, curr) => Number(acc) + Number(curr.price) * Number(curr.count), 0);
  }
}
