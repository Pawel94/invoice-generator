import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Invoice} from "../../../shared/model";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-preview-invoice-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './preview-invoice-table.component.html',
  styleUrls: ['./preview-invoice-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewInvoiceTableComponent {

  @Input() selectedInvoiceOption?: Invoice[];

  displayedColumns: string[] = ['position', 'name', 'count', 'price'];

  getAmountPrice(data: Invoice[]): number {
    return data.reduce((acc, curr) => acc + curr.price * curr.count, 0);
  }
}
