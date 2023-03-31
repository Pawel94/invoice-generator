import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvoiceTableComponent } from './preview-invoice-table.component';

describe('PreviewInvoiceTableComponent', () => {
  let component: PreviewInvoiceTableComponent;
  let fixture: ComponentFixture<PreviewInvoiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreviewInvoiceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
