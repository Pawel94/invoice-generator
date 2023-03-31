import {Component, inject, OnInit} from '@angular/core';
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
import {InvoiceStateService} from "../../state/services/invoice-state.service";
import {Invoice} from "../../state/model/invoice-model";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

const nameMinCharacters = 3;
const nameMaxCharacters = 30;

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
    MatSnackBarModule],
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
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
    this.addNewInvoiceGroup()
    this.invoiceState.clearInvoiceOption()
  }

  get invoiceRow() {
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
      count: new FormControl<string>("1", {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern("^[0-9]*$"),],

      }),
      price: new FormControl<string>("0", {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000.),
          Validators.pattern("^[0-9]*$"),
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  submitForm() {
    this.invoiceForm.markAllAsTouched()
    if (this.invoiceForm.value.invoiceRow?.length === 0) {
      this.openSnackBar("Please add items", "ok")
    }
    else if (this.invoiceForm.status === "VALID") {
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
    if (value === 'price') return 'Max length 100'
    else if (value === 'count') return 'Max length 1000000'
    return ''
  }

  getSyntaxErrorMessage(): string {
    return 'Please input number'
  }

  getEmptyErrorMessage(): string {
    return 'Please input value'
  }
}
