import { createFeature, createReducer, on } from '@ngrx/store';
import { StaffActions } from '../actions/staff.action';

export interface StaffState {
  loading: boolean;
  message: string | null;
  data: unknown;
}

export const initialState: StaffState = {
  loading: false,
  message: null,
  data: null,
};

export const staffFeature = createFeature({
  name: 'staff',
  reducer: createReducer(
    initialState,
    on(StaffActions.newStaff, (state) => ({
      ...state,
      loading: true,
    })),
    on(StaffActions.addNewStaffSuccess, (state, action) => ({
      ...state,
      loading: false,
      message: action.res.message,
    })),
    on(StaffActions.addNewStaffFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message,
    }))
  ),
});

export const {
  name: staffFeatureKey,
  reducer: staffReducer,
  selectLoading,
  selectMessage,
} = staffFeature;
