import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewInvoiceComponent} from './new-invoice.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from '@angular/common'
import {routes} from "../../app/app-routing.module";

describe('NewInvoiceComponent', () => {
  let component: NewInvoiceComponent;
  let fixture: ComponentFixture<NewInvoiceComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvoiceComponent, BrowserAnimationsModule, RouterTestingModule, RouterTestingModule.withRoutes(routes)]
    })
      .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(NewInvoiceComponent);
    component = fixture.componentInstance;
    router.initialNavigation()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one form array after component start', () => {
    const invoiceForm = component.invoiceForm.controls

    expect(invoiceForm.invoiceRow.controls.length).toBe(1);
  });

  it('should add correct values to form', () => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow.get('name')
    const formCount = invoiceRow.get('count')
    const formPrice = invoiceRow.get('price')
    formName?.setValue('newName')
    formCount?.setValue('3')
    formPrice?.setValue('5')

    fixture.detectChanges();

    expect(formName?.value).toBe("newName");
    expect(formCount?.value).toBe("3");
    expect(formPrice?.value).toBe("5");
    expect(formName?.valid).toBeTrue()
    expect(formCount?.valid).toBeTrue()
    expect(formPrice?.valid).toBeTrue()
  });

  it('should return not valid controls - min value and min char length', () => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow!.get('name')
    const formCount = invoiceRow.get('count')
    const formPrice = invoiceRow.get('price')
    formName?.setValue('n')
    formCount?.setValue('0')
    formPrice?.setValue('0')

    fixture.detectChanges();

    expect(formName?.valid).toBeFalse()
    expect(formCount?.valid).toBeFalse()
    expect(formPrice?.valid).toBeFalse()
    expect(formName?.errors?.["minlength"]).toBeTruthy();
    expect(formCount?.errors?.["min"]).toBeTruthy();
    expect(formCount?.errors?.["min"]).toBeTruthy();
  });
  it('should return not valid controls - max value and max char length', () => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow!.get('name')
    const formCount = invoiceRow.get('count')
    const formPrice = invoiceRow.get('price')
    formName?.setValue('naaaaaaaaaaaaaaaaaaaaaaaaammmmmmmmmmmmmmmeeeeeeeeeeee')
    formCount?.setValue('11111110')
    formPrice?.setValue('11111110')

    fixture.detectChanges();

    expect(formName?.valid).toBeFalse()
    expect(formCount?.valid).toBeFalse()
    expect(formPrice?.valid).toBeFalse()
    expect(formName?.errors?.["maxlength"]).toBeTruthy();
    expect(formCount?.errors?.["max"]).toBeTruthy();
    expect(formCount?.errors?.["max"]).toBeTruthy();
  });

  it('should return not valid controls - string instead of number ', () => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow!.get('name')
    const formCount = invoiceRow.get('count')
    const formPrice = invoiceRow.get('price')
    formName?.setValue('namee')
    formCount?.setValue('1a')
    formPrice?.setValue('b')

    fixture.detectChanges();

    expect(formName?.valid).toBeTrue()
    expect(formCount?.valid).toBeFalse()
    expect(formPrice?.valid).toBeFalse()
    expect(formCount?.errors?.["pattern"]).toBeTruthy();
    expect(formCount?.errors?.["pattern"]).toBeTruthy();
  });

  it('should return correct size of form group - after added new one ', () => {
    const invoiceForm = component.invoiceForm.controls

    component.addNewInvoiceGroup()

    fixture.detectChanges();

    expect(invoiceForm.invoiceRow.controls.length).toBe(2);

  });
  it('should return correct size of form group - after delete row', () => {
    const invoiceForm = component.invoiceForm.controls

    component.deleteInvoiceRow(0)

    fixture.detectChanges();

    expect(invoiceForm.invoiceRow.controls.length).toBe(0);

  });

  it(' should navigate to /preview after submit ', fakeAsync(() => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow.get('name')
    const formCount = invoiceRow.get('count')
    const formPrice = invoiceRow.get('price')
    formName?.setValue('newName')
    formCount?.setValue('3')
    formPrice?.setValue('5')


    component.submitForm()
    fixture.detectChanges();
    tick();


    expect(location.path()).toBe('/preview');
  }));

  it('should stay in page after submit with errors ', (() => {
    const invoiceRow = component.invoiceForm.controls.invoiceRow.controls[0]
    const formName = invoiceRow.get('name')

    formName?.setValue('newName')

    component.submitForm()

    fixture.detectChanges();

    expect(location.path()).toBe('');
    expect(component.invoiceForm.status).toBe('INVALID');
  }));


  it('should stay in page after submit with errors - no rows to fill', (() => {
    spyOn(component, 'openSnackBar');
    component.deleteInvoiceRow(0)
    component.submitForm()

    fixture.detectChanges();

    expect(component.openSnackBar).toHaveBeenCalled();
  }));
});
