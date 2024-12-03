import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'c-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: any[] = [];
  @Input() placeholder: string = '';
  @Input() label!: string;
  @Input() required: boolean = false;
  @Input() formControlName!: string;
  @Input() form: any;
  @Input() errorMessage = '';

  value: any;
  error!: string;

  onChange = (_: any) => {};
  onTouched = () => {};

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !control.value) {
      return { required: true };
    }
    return null;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onSelectChange(value: any) {
    this.onChange(value.target.value);
    this.onTouched();
  }

  getErrorMessage() {
    if (this.required && this.value === '') {
      return this.errorMessage;
    }
    return '';
  }
}
