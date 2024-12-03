import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { newStaffRequest } from '../../../core/model/staff/newstaff';
import { genericApiResponse } from '../../../core/model/api/genericApiResponse';
import { apiErrorResponse } from '../../../core/model/api/apiErrorResponse';
import {
  paginationPayload,
  paginationPayloadResponse,
  staffByStatus,
} from '../../../core/model/staff/staffByStatus';

export const StaffActions = createActionGroup({
  source: 'staff',
  events: {
    NewStaff: props<{ staff: newStaffRequest }>(),
    'Add New Staff Failure': props<{ error: apiErrorResponse }>(),
    'Add New Staff Success': props<{ res: genericApiResponse }>(),
    'Get Pending Staff': props<{ pageInfo: paginationPayload }>(),
    'Get Pending Staff Success': props<{
      res: paginationPayloadResponse<staffByStatus>;
    }>(),
    'Get Pending Staff Failure': emptyProps(),
  },
});

export const StaffStatusActions = createActionGroup({
  source: 'Staff Status',
  events: {
    'Load Status Counts': emptyProps(),
    'Load Status Counts Success': props<{
      accepted: number;
      suspended: number;
      pending: number;
    }>(),
    'Load Status Counts Failure': props<{ error: any }>(),
  },
});
