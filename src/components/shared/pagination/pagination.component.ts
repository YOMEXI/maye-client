import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'c-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalPages = 0;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    // console.log(this.totalPages);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showEllipsis(): boolean {
    return this.totalPages > 5;
  }

  changePage(page: number) {
    console.log(page);
    this.pageChange.emit(page);
  }
}
