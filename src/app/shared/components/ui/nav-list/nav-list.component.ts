import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
      [ngClass]="active ? 'bg-brand-magenta/10 text-brand-magenta' : 'hover:bg-gray-50 text-gray-700'">
      <div class="flex items-center gap-3">
        <ng-content select="[icon]"></ng-content>
        <span class="font-medium text-sm">{{ title }}</span>
      </div>
      <div class="flex items-center gap-2">
        <ng-content select="[action]"></ng-content>
      </div>
    </div>
  `
})
export class NavListItemComponent {
  @Input() title: string = '';
  @Input() active: boolean = false;
}
