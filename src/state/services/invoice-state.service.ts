import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Invoice} from "../model/invoice-model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceStateService {

  private invoiceOption$: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([{name:"dasd",price:"",count:""}]);
  selectedInvoiceOption$ = this.invoiceOption$.asObservable();
  constructor() { }

  setInvoiceOption(invoice: Invoice[]) {
    this.invoiceOption$.next(invoice);
  }

  clearInvoiceOption(){
    this.invoiceOption$.next([]);
  }
}
