import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'c-date-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectorComponent),
      multi: true,
    },
  ],
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
})
export class DateSelectorComponent implements ControlValueAccessor {
  selectedDate: Date | null = null;
  currentMonth: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { date: Date | null; isCurrentMonth: boolean }[] = [];
  showCalendar: boolean = false;
  touched = false;
  disabled = false;

  constructor(private elementRef: ElementRef) {}

  onChange = (date: Date | null) => {};
  onTouched = () => {};

  ngOnInit() {
    this.generateCalendarDays();
  }

  // ControlValueAccessor Implementation
  writeValue(date: Date | null): void {
    this.selectedDate = date;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  generateCalendarDays() {
    this.calendarDays = [];
    const firstDayOfCurrentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
    const lastDayOfCurrentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );

    // Calculate the days from the previous month to display
    const startDay = firstDayOfCurrentMonth.getDay(); // Day of the week the current month starts on
    const lastDateOfPreviousMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      0
    ).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        lastDateOfPreviousMonth - i
      );
      this.calendarDays.push({ date, isCurrentMonth: false });
    }

    // Add current month's days
    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
      const date = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        i
      );
      this.calendarDays.push({ date, isCurrentMonth: true });
    }

    // Add next month's days to fill the grid (up to 42 total cells)
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        i
      );
      this.calendarDays.push({ date, isCurrentMonth: false });
    }
  }

  previousMonth(event: Event) {
    event.stopPropagation();
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1
    );
    this.generateCalendarDays();
  }

  nextMonth(event: Event) {
    event.stopPropagation();
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1
    );
    this.generateCalendarDays();
  }

  selectDate(dateObj: { date: Date | null; isCurrentMonth: boolean }) {
    if (dateObj.date && dateObj.isCurrentMonth && !this.disabled) {
      this.selectedDate = dateObj.date;
      this.onChange(dateObj.date);
      this.onTouched();
      this.showCalendar = false;
    }
  }

  toggleCalendar() {
    if (!this.disabled) {
      this.showCalendar = !this.showCalendar;
      if (!this.touched) {
        this.touched = true;
        this.onTouched();
      }
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}
