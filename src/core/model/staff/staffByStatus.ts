export interface staffByStatus {
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  email: string;
  occupation: string;
  dob: string;
  gender: string;
  yearsOfExperience: number;
  medicalLicense: string;
  employmentStatus: string;
  telephoneNumber: string;
  staffId: string;
  status: 'ACCEPTED' | 'SUSPENDED' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export interface paginationPayload {
  page: number;
  pageSize: number;
}

export interface paginationPayloadResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface Content {
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  email: string;
  occupation: string;
  dob: string;
  gender: string;
  yearsOfExperience: number;
  medicalLicense: string;
  employmentStatus: string;
  telephoneNumber: string;
  staffId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
