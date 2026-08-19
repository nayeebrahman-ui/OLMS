import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem { id: string; label: string; badge?: string; icon?: string; }

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="vertical ? 'flex flex-col gap-2 w-48' : 'flex items-center gap-4 border-b border-gray-200 pb-2'">
      @for (tab of tabs; track tab.id) {
        <button 
          (click)="selectTab(tab.id)"
          class="flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-all duration-200"
          [ngClass]="activeTab === tab.id 
            ? 'bg-brand-magenta text-white shadow-sm' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'">
          <div class="flex items-center gap-2">
            <span *ngIf="tab.icon" [innerHTML]="tab.icon"></span>
            {{ tab.label }}
          </div>
          <span *ngIf="tab.badge" 
                class="ml-2 px-1.5 py-0.5 text-xs rounded-full"
                [ngClass]="activeTab === tab.id ? 'bg-white text-brand-magenta' : 'bg-gray-200 text-gray-700'">
            {{ tab.badge }}
          </span>
        </button>
      }
    </div>
  `
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  @Input() vertical: boolean = false;
  @Output() tabChange = new EventEmitter<string>();

  selectTab(id: string) {
    this.activeTab = id;
    this.tabChange.emit(id);
  }
}
