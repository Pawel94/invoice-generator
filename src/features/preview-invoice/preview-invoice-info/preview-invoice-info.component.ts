import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyInfo} from "../../../shared/model";

@Component({
  selector: 'app-preview-invoice-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-invoice-info.component.html',
  styleUrls: ['./preview-invoice-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewInvoiceInfoComponent {

  @Input() companyInfo?: CompanyInfo;

  showPhones(phones: string[]) {
    return phones.join(", ")
  }
}
