import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  menuItems: MenuItem[] = [
    {
      name: 'Home',
      icon: 'bx bx-home-alt',
      route: '#',
      subItems: [],
      isExpanded: false,
    },
    {
      name: 'Staff',
      icon: 'bx bx-bar-chart-alt-2',
      route: '#',
      isExpanded: false,
      subItems: [
        {
          name: 'Register',
          icon: 'fas fa-users',
          route: 'staff/register',
        },
      ],
    },
  ];

  toggleSubmenu(item: MenuItem) {
    item.isExpanded = !item.isExpanded;
  }
}

interface MenuItem {
  name: string;
  icon: string;
  route: string;
  subItems?: MenuItem[];
  isExpanded?: boolean;
}
