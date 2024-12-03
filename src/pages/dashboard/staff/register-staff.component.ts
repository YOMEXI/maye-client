import { Component } from '@angular/core';
import { InputComponent } from '../../../components/shared/form/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateSelectorComponent } from '../../../components/shared/form/date-selector/date-selector.component';
import { SelectComponent } from '../../../components/shared/form/select/select.component';
import { RadioComponent } from '../../../components/shared/form/radio/radio.component';
import { CommonModule } from '@angular/common';
import { CircularLoaderComponent } from '../../../components/shared/circular-loader/circular-loader.component';
import { Store } from '@ngrx/store';
import { StaffActions } from '../../../store/staff/actions/staff.action';
import { newStaffRequest } from '../../../core/model/staff/newstaff';
import {
  selectLoading,
  selectMessage,
} from '../../../store/staff/reducers/staff.reducer';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-register-staff',
  standalone: true,
  imports: [
    InputComponent,
    DateSelectorComponent,
    SelectComponent,
    ReactiveFormsModule,
    RadioComponent,
    CommonModule,
    CircularLoaderComponent,
  ],
  templateUrl: './register-staff.component.html',
  styleUrl: './register-staff.component.scss',
})
export class RegisterStaffComponent {
  staffRegistrationForm!: FormGroup;
  isLoading: boolean = false;

  employmentStatus = [
    { label: 'Contract', value: 'contract' },
    { label: 'Fulltime', value: 'fulltime' },
  ];

  selectedOption: string = 'option1';
  onRadioChange(value: string) {
    console.log('Selected Option:', value);
  }

  medicalOccupation = [
    { value: 'Physician', label: 'Physician' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Surgeon', label: 'Surgeon' },
    { value: 'Pharmacist', label: 'Pharmacist' },
    { value: 'Therapist', label: 'Therapist' },
    { value: 'Radiologist', label: 'Radiologist' },
    { value: 'Dentist', label: 'Dentist' },
    { value: 'Optometrist', label: 'Optometrist' },
    { value: 'Anesthesiologist', label: 'Anesthesiologist' },
    { value: 'Pediatrician', label: 'Pediatrician' },
  ];

  gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  constructor(private fb: FormBuilder, private store: Store) {
    this.initStaffRegistrationForm();
  }

  initStaffRegistrationForm() {
    this.staffRegistrationForm = this.fb.group({
      firstName: ['Kola', Validators.required],
      lastName: ['Bolu', Validators.required],
      middleName: ['Omar', Validators.required],
      address: ['3 city gate barracks', Validators.required],
      email: [
        'kola@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      occupation: ['Dentist', Validators.required],

      dob: ['', Validators.required],
      gender: ['Male', Validators.required],
      yearsOfExperience: ['4', Validators.required],
      medicalLicense: ['TRY678', Validators.required],
      employmentStatus: ['', Validators.required],
      telephoneNumber: ['09087654321', Validators.required],
    });
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectLoading),
    message: this.store.select(selectMessage),
  });

  registerStaff() {
    if (this.staffRegistrationForm.valid) {
      const staff: newStaffRequest = this.staffRegistrationForm.value;

      this.store.dispatch(StaffActions.newStaff({ staff }));
    } else {
      this.staffRegistrationForm.updateValueAndValidity();
      this.staffRegistrationForm.markAllAsTouched();
    }
  }

  NameControl(data: any): FormControl {
    return this.staffRegistrationForm.get(data) as FormControl;
  }
}
