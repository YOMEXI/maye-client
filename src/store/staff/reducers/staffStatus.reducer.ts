import { createFeature, createReducer, on } from '@ngrx/store';
import { StaffActions } from '../actions/staff.action';
import {
  paginationPayloadResponse,
  staffByStatus,
} from '../../../core/model/staff/staffByStatus';

export interface StaffState {
  loading: boolean;
  pendingStaffdata: paginationPayloadResponse<staffByStatus> | null;
  acceptedStaff: paginationPayloadResponse<staffByStatus> | null;
  suspendedStaff: paginationPayloadResponse<staffByStatus> | null;

  message: string | null;
}

export const initialState: StaffState = {
  loading: false,
  pendingStaffdata: null,
  acceptedStaff: null,
  suspendedStaff: null,
  message: null,
};

export const staffStatusFeature = createFeature({
  name: 'staffStatus',
  reducer: createReducer(
    initialState,
    on(StaffActions.getPendingStaff, (state) => ({
      ...state,
      loading: true,
    })),
    on(StaffActions.getPendingStaffSuccess, (state, { res }) => ({
      ...state,
      loading: false,
      pendingStaffdata: res,
    }))
  ),
});

export const {
  name: staffStatusFeatureKey,
  reducer: staffStatusReducer,
  selectPendingStaffdata,
  selectAcceptedStaff,
  selectSuspendedStaff,
  selectLoading,
  selectMessage,
} = staffStatusFeature;
