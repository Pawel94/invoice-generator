import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceStateService} from "../../shared/services";
import {MatTableModule} from "@angular/material/table";
import {PreviewInvoiceTableComponent} from "./preview-invoice-table/preview-invoice-table.component";
import {CompanyDataService} from "../../shared/services";
import {PreviewInvoiceInfoComponent} from "./preview-invoice-info/preview-invoice-info.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {catchError, of} from "rxjs";
import {CompanyInfo} from "../../shared/model";
import {Action} from "../../shared/model";


@Component({
  standalone: true,
  selector: 'app-preview-invoice',
  imports: [CommonModule, MatTableModule, PreviewInvoiceTableComponent, PreviewInvoiceInfoComponent, MatSnackBarModule],
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewInvoiceComponent {
  private readonly invoiceData = inject(InvoiceStateService);
  private readonly companyData = inject(CompanyDataService);
  private readonly _snackBarError = inject(MatSnackBar)
  selectedInvoiceOption$ = this.invoiceData.selectedInvoiceOption$;
  companyInfoFromServer$ = this.companyData.getCompanyData().pipe(catchError(err => {
    this.openSnackBarError(err, Action.OK)
    return of({} as CompanyInfo)
  }))

  private openSnackBarError(message: string, action: Action): void {
    this._snackBarError.open(message, action);
  }


}
