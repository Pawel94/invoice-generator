import {Component, OnInit} from '@angular/core';
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

const nameMinCharacters = 3;
const nameMaxCharacters = 30;

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatGridListModule],
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
  invoiceForm = this.fb.group({
    invoiceRow: this.fb.array([])
  });

  getSyntaxForMinimumCharLength() {
    return 'Min length 3'
  }

  getSyntaxForMaximumCharLength() {
    return 'Min length 30'
  }

  getErrorMessageForMinValue(value: string) {
    if (value === 'price') return 'Min length 0'
    else if (value === 'count') return 'Min length 1'
    return ''
  }

  getErrorMessageForMaxValue(value: string) {
    if (value === 'price') return 'Max length 100'
    else if (value === 'count') return 'Max length 1000000'
    return ''
  }

  getSyntaxErrorMessage() {
    return 'Please input number'
  }

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addNewInvoiceGroup()
  }

  get invoiceRow() {
    return this.invoiceForm.controls["invoiceRow"] as FormArray;
  }

  addNewInvoiceGroup(): void {
    const lessonForm = this.fb.group({
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
          Validators.min(0),
          Validators.max(1000000.),
          Validators.pattern("^[0-9]*$"),
        ],
      }),
    });
    this.invoiceRow.push(lessonForm);

  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  deleteInvoiceRow(index: number): void {
    this.invoiceRow.removeAt(index);
  }

  submitForm() {
    console.log(this.invoiceForm.value);
  }
}
