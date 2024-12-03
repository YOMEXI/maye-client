import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'c-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  @Input() tabs: Tab[] = [];
  activeTabIndex = 0;

  get activeTab(): Tab | undefined {
    return this.tabs[this.activeTabIndex];
  }

  selectTab(index: number): void {
    this.activeTabIndex = index;
  }
}

interface Tab {
  label: string;
  icon: string;
  content: TemplateRef<unknown>;
}
