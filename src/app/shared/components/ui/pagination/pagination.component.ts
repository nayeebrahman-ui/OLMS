import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg sm:px-6">
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span> of 
            <span class="font-medium">{{ totalItems }}</span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>Results per page:</span>
            <select class="border border-gray-300 rounded-md py-1 px-2 focus:ring-brand-magenta focus:border-brand-magenta outline-none">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Previous</span>
              &laquo; Previous
            </button>
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-brand-magenta text-sm font-medium text-white">
              1
            </button>
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-brand-magenta hover:bg-gray-50">
              2
            </button>
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-brand-magenta hover:bg-gray-50">
              3
            </button>
            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-brand-magenta hover:bg-gray-50">
              Next &raquo;
            </button>
          </nav>
        </div>
      </div>
    </div>
  `
})
export class PaginationComponent {
  @Input() totalItems: number = 100;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  Math = Math; 
}
