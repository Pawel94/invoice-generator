import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-invoice-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-invoice-info.component.html',
  styleUrls: ['./preview-invoice-info.component.scss']
})
export class PreviewInvoiceInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
