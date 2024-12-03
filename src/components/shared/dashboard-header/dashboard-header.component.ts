import { Component } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  infobox = false;
  constructor(private sidebarService: SidebarService) {}

  onToggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  showInfoBox() {
    this.infobox = !this.infobox;
  }
}
