import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewInvoiceComponent} from './preview-invoice.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

describe('PreviewInvoiceComponent', () => {
  let component: PreviewInvoiceComponent;
  let fixture: ComponentFixture<PreviewInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewInvoiceComponent, RouterTestingModule, BrowserAnimationsModule, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
