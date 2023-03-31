import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvoiceInfoComponent } from './preview-invoice-info.component';

describe('PreviewInvoiceInfoComponent', () => {
  let component: PreviewInvoiceInfoComponent;
  let fixture: ComponentFixture<PreviewInvoiceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreviewInvoiceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewInvoiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
