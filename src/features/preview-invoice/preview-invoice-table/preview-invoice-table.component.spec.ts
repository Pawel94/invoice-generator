import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewInvoiceTableComponent} from './preview-invoice-table.component';
import {Invoice} from "../../../shared/model";

describe('PreviewInvoiceTableComponent', () => {
  let component: PreviewInvoiceTableComponent;
  let fixture: ComponentFixture<PreviewInvoiceTableComponent>;
  const mockData: Invoice[] = [{name: "abc", count: 3, price: 4}, {
    name: "abc2",
    count: 1,
    price: 1
  }, {name: "abc3", count: 3, price: 4}]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewInvoiceTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct value', () => {
    const value = component.getAmountPrice(mockData)
    expect(value).toBe(25);
  });
});
