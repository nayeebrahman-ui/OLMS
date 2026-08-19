import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside [ngClass]="isExpanded ? 'w-64' : 'w-16'" class="h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col">
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <div class="flex items-center overflow-hidden whitespace-nowrap">
          <ng-content select="[brand-logo]"></ng-content>
        </div>
        <button (click)="toggle()" class="text-gray-400 hover:text-brand-magenta transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path *ngIf="isExpanded" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
            <path *ngIf="!isExpanded" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
         <ng-content select="[nav-items]"></ng-content>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() isExpanded: boolean = true;
  @Output() expandedChange = new EventEmitter<boolean>();

  toggle() {
    this.isExpanded = !this.isExpanded;
    this.expandedChange.emit(this.isExpanded);
  }
}
