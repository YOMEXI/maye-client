import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'c-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() inputType: 'text' | 'textarea' = 'text';
  @Input() placeholder = '';
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() rows = 3;
  @Input() cols = 30;
  @Input() pattern?: string;
  @Input() autocomplete = 'off';
  @Input() ariaLabel = '';
  @Input() showCharCount = false;
  @Input() debounceTime = 300;
  @Input() trimWhitespace = true;
  @Input() transformToUppercase = false;
  @Input() numbersOnly = false;
  @Input() required = false;

  @Input() control: FormControl;

  private destroy$ = new Subject<void>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.control = new FormControl('');
  }

  ngOnInit() {
    this.setupValidators();
    this.setupValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupValidators() {
    const validators: ValidatorFn[] = [];
    if (this.required) validators.push(Validators.required);
    if (this.minLength) validators.push(Validators.minLength(this.minLength));
    if (this.maxLength) validators.push(Validators.maxLength(this.maxLength));
    if (this.pattern) validators.push(Validators.pattern(this.pattern));
    if (this.numbersOnly) validators.push(this.numbersOnlyValidator());
    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  private setupValueChanges() {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        let transformedValue = value;
        if (this.trimWhitespace && typeof value === 'string') {
          transformedValue = value.trim();
        }
        if (this.transformToUppercase && typeof value === 'string') {
          transformedValue = value.toUpperCase();
        }
        this.onChange(transformedValue);
      });
  }

  private numbersOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^\d*$/.test(control.value);
      return valid ? null : { numbersOnly: { value: control.value } };
    };
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  onFocus(): void {
    // Custom focus logic can be added here
  }

  onBlur(): void {
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.numbersOnly) {
      // Allow: backspace, delete, tab, escape, enter, and .
      if (
        [46, 8, 9, 27, 13, 110].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (event.keyCode === 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
        (event.keyCode < 96 || event.keyCode > 105)
      ) {
        event.preventDefault();
      }
    }
  }
}
