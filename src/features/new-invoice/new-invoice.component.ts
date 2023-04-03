import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {InvoiceStateService} from "../../shared/services";
import {Invoice} from "../../shared/model";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Action} from "../../shared/model";
import {TranslocoModule} from "@ngneat/transloco";

const nameMinCharacters = 3;
const nameMaxCharacters = 30;
const minNumber = 1;
const maxNumberCount = 100;
const maxNumberPrice = 1000000;
const onlyNumberPattern = "^[0-9]*$"

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    TranslocoModule,
    MatSnackBarModule],
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInvoiceComponent implements OnInit {
  private readonly invoiceData = inject(InvoiceStateService);
  private readonly fb = inject(FormBuilder)
  private readonly _snackBar = inject(MatSnackBar)
  private readonly invoiceState = inject(InvoiceStateService)
  private readonly router = inject(Router)

  invoiceForm = this.fb.group({
    invoiceRow: this.fb.array([])
  });


  ngOnInit(): void {
    this.addNewInvoiceGroup();
    this.invoiceState.clearInvoiceOption();
  }

  get invoiceRow(): FormArray {
    return this.invoiceForm.controls["invoiceRow"] as FormArray;
  }

  addNewInvoiceGroup(): void {
    const newInvoiceRow = this.fb.group({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(nameMinCharacters),
          Validators.maxLength(nameMaxCharacters),
        ],
      }),
      count: new FormControl<number>(1, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(minNumber),
          Validators.max(maxNumberCount),
          Validators.pattern(onlyNumberPattern),],

      }),
      price: new FormControl<number>(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(minNumber),
          Validators.max(maxNumberPrice),
          Validators.pattern(onlyNumberPattern),
        ],
      }),
    });
    this.invoiceRow.push(newInvoiceRow);

  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  deleteInvoiceRow(index: number): void {
    this.invoiceRow.removeAt(index);
  }

  openSnackBar(message: string, action: Action): void {
    this._snackBar.open(message, action);
  }

  submitForm(): void {
    this.invoiceForm.markAllAsTouched()
    if (this.invoiceForm.value.invoiceRow?.length === 0) {
      this.openSnackBar("Please add items", Action.OK)
    } else if (this.invoiceForm.status === "VALID") {
      this.invoiceData.setInvoiceOption(this.invoiceForm.value.invoiceRow as Invoice[])
      this.router.navigate(['/', 'preview']);
    }

  }

  getSyntaxForMinimumCharLength(): string {
    return 'Min length 3'
  }

  getSyntaxForMaximumCharLength(): string {
    return 'Min length 30'
  }

  getErrorMessageForMinValue(): string {
    return 'Min length 1'
  }

  getErrorMessageForMaxValue(value: string): string {
    if (value === 'price') return 'Max length 1000000'
    if (value === 'count') return 'Max length 100'
    return ''
  }

  getSyntaxErrorMessage(): string {
    return 'Please input number'
  }

  getEmptyErrorMessage(): string {
    return 'Please input value'
  }
}
