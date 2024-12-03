import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'c-radio',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: any;
  showError = false;
  private isTouched = false;

  // ControlValueAccessor methods
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
    this.showError = !value && this.isTouched;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: Implement disable/enable logic if needed
  }

  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
    this.isTouched = true;
    this.showError = !value;
    this.selectionChange.emit(value);
  }
}
