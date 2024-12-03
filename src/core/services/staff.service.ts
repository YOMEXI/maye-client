import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newStaffRequest } from '../model/staff/newstaff';
import { environment } from '../../environments/environment.development';
import { genericApiResponse } from '../model/api/genericApiResponse';
import { Observable, forkJoin, map } from 'rxjs';
import {
  StatusCounts,
  StaffDashboardResponse,
} from '../model/staff/staffDashboard';
import {
  paginationPayload,
  paginationPayloadResponse,
  staffByStatus,
} from '../model/staff/staffByStatus';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  createStaff(data: newStaffRequest) {
    return this.http.post<genericApiResponse>(
      environment.baseUrl + '/staff',
      data
    );
  }

  getStatusCounts(): Observable<StatusCounts> {
    return forkJoin({
      accepted: this.http
        .get<StaffDashboardResponse>(`${environment.baseUrl}/staff/accepted`)
        .pipe(map((response) => response.content.length)),
      suspended: this.http
        .get<StaffDashboardResponse>(`${environment.baseUrl}/staff/suspended`)
        .pipe(map((response) => response.content.length)),
      pending: this.http
        .get<StaffDashboardResponse>(`${environment.baseUrl}/staff/pending`)
        .pipe(map((response) => response.content.length)),
    });
  }

  getAllPendingStaff(data: paginationPayload) {
    return this.http.get<paginationPayloadResponse<staffByStatus>>(
      `${environment.baseUrl}/staff/pending?page=${data.page}&pageSize=${data.pageSize}`
    );
  }
}
