import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  StaffActions,
  StaffStatusActions,
} from '../../../store/staff/actions/staff.action';
import { Store } from '@ngrx/store';
import { ChartData, ChartOptions } from 'chart.js';
import { combineLatest, map, Observable, tap } from 'rxjs';
import {
  selectAcceptedStaff,
  selectPendingStaff,
  selectSuspendedStaff,
} from '../../../store/staff/reducers/staffDashboardReducer';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../../../components/shared/tab/tab.component';
import {
  paginationPayloadResponse,
  staffByStatus,
} from '../../../core/model/staff/staffByStatus';
import { selectPendingStaffdata } from '../../../store/staff/reducers/staffStatus.reducer';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BaseChartDirective,
    CommonModule,
    TabComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  page = 0;
  pageSize = 1;
  constructor(private store: Store) {}

  chartData$!: Observable<ChartData<'pie'>>;
  pendingStaff!: Observable<paginationPayloadResponse<staffByStatus> | null>;

  public chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  ngOnInit() {
    this.fetchPendingStaff();
    this.store.dispatch(StaffStatusActions.loadStatusCounts());

    this.chartData$ = combineLatest({
      acceptedStaff: this.store.select(selectAcceptedStaff),
      suspendedStaff: this.store.select(selectSuspendedStaff),
      pendingStaff: this.store.select(selectPendingStaff),
    }).pipe(
      // tap((data) => console.log('chart data:', data)),
      map(({ acceptedStaff, suspendedStaff, pendingStaff }) => ({
        labels: ['Accepted', 'Suspended', 'Pending'],
        datasets: [
          {
            data: [acceptedStaff, suspendedStaff, pendingStaff],
            backgroundColor: ['#4CAF50', 'red', '#FF8D21'],
          },
        ],
      }))
    );
  }
  fetchPendingStaff() {
    this.store.dispatch(
      StaffActions.getPendingStaff({
        pageInfo: { page: this.page, pageSize: this.pageSize },
      })
    );
    this.pendingStaff = this.store.select(selectPendingStaffdata);
  }

  onPageChange(page: number) {
    console.log(page);
    this.page = page;
    this.fetchPendingStaff();
  }
}
