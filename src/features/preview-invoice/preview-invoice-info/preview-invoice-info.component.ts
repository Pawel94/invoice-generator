import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyInfo} from "../../../state/model/company-info-model";

@Component({
  selector: 'app-preview-invoice-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-invoice-info.component.html',
  styleUrls: ['./preview-invoice-info.component.scss']
})
export class PreviewInvoiceInfoComponent {

  @Input() companyInfo?: CompanyInfo;

  constructor() {
  }


  showPhones(phones: string[]) {
    return phones.join(", ")
  }
}
