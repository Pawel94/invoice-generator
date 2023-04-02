import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Invoice} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceStateService {

  private invoiceOption$: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  selectedInvoiceOption$ = this.invoiceOption$.asObservable();

  setInvoiceOption(invoice: Invoice[]) {
    this.invoiceOption$.next(invoice);
  }

  clearInvoiceOption() {
    this.invoiceOption$.next([]);
  }
}
