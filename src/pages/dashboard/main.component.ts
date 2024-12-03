import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/shared/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../../components/shared/dashboard-header/dashboard-header.component';
import { Subject, takeUntil } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SideBarComponent,
    CommonModule,
    DashboardHeaderComponent,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isSidebarOpen = true;

  private destroy$ = new Subject<void>(); // Used to signal unsubscription

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    // Subscribe to the sidebar state and automatically unsubscribe when destroy$ emits
    this.sidebarService.isSidebarOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
      });
  }

  ngOnDestroy() {
    // Emit the destroy signal to complete the observable pipeline
    this.destroy$.next();
    this.destroy$.complete();
  }
}
