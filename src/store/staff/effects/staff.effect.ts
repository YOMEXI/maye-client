import { inject } from '@angular/core';
import { switchMap, of, map, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StaffService } from '../../../core/services/staff.service';
import { StaffActions, StaffStatusActions } from '../actions/staff.action';
import { newStaffRequest } from '../../../core/model/staff/newstaff';
import { genericApiResponse } from '../../../core/model/api/genericApiResponse';
import { ToastrService } from 'ngx-toastr';
import { StatusCounts } from '../../../core/model/staff/staffDashboard';
import {
  paginationPayloadResponse,
  staffByStatus,
} from '../../../core/model/staff/staffByStatus';

export const crateNewStaff = createEffect(
  (
    actions$: any = inject(Actions),
    staffService = inject(StaffService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(StaffActions.newStaff),
      switchMap(({ staff }) => {
        return staffService.createStaff(staff).pipe(
          map((res: genericApiResponse) => {
            toastr.success(res.message);
            return StaffActions.addNewStaffSuccess({ res });
          }),
          catchError((err) => {
            toastr.error(err.error.message);
            return of(StaffActions.addNewStaffFailure(err));
          })
        );
      })
    );
  },
  { functional: true }
);

export const loadStatusCounts = createEffect(
  (actions$: any = inject(Actions), staffService = inject(StaffService)) => {
    return actions$.pipe(
      ofType(StaffStatusActions.loadStatusCounts),
      switchMap(({ staff }) => {
        return staffService.getStatusCounts().pipe(
          map((res: StatusCounts) => {
            return StaffStatusActions.loadStatusCountsSuccess(res);
          }),
          catchError((error) =>
            of(StaffStatusActions.loadStatusCountsFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const getAllPendingStaff = createEffect(
  (actions$: any = inject(Actions), staffService = inject(StaffService)) => {
    return actions$.pipe(
      ofType(StaffActions.getPendingStaff),
      switchMap(({ pageInfo }) => {
        return staffService.getAllPendingStaff(pageInfo).pipe(
          map((res: paginationPayloadResponse<staffByStatus>) => {
            return StaffActions.getPendingStaffSuccess({ res });
          }),
          catchError((error) => of(StaffActions.getPendingStaffFailure()))
        );
      })
    );
  },
  { functional: true }
);
