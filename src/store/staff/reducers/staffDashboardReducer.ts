import { createFeature, createReducer, on } from '@ngrx/store';
import { StaffActions, StaffStatusActions } from '../actions/staff.action';

export interface StaffState {
  loadingDashboard: boolean;
  message: string | null;
  acceptedStaff: number;
  suspendedStaff: number;
  pendingStaff: number;
}

export const initialState: StaffState = {
  loadingDashboard: false,
  message: null,
  acceptedStaff: 0,
  suspendedStaff: 0,
  pendingStaff: 0,
};

export const staffDashboardFeature = createFeature({
  name: 'staffDashboard',
  reducer: createReducer(
    initialState,
    on(StaffStatusActions.loadStatusCounts, (state) => ({
      ...state,
      loading: true,
    })),
    on(
      StaffStatusActions.loadStatusCountsSuccess,
      (state, { accepted, suspended, pending }) => ({
        ...state,
        acceptedStaff: accepted,
        suspendedStaff: suspended,
        pendingStaff: pending,
        loading: false,
        error: null,
      })
    ),
    on(StaffStatusActions.loadStatusCountsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

export const {
  name: staffDashboardFeatureKey,
  reducer: staffDashboardReducer,
  selectAcceptedStaff,
  selectPendingStaff,
  selectSuspendedStaff,
  selectLoadingDashboard,
  selectMessage,
} = staffDashboardFeature;
