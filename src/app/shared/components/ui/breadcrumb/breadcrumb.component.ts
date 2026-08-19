import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem { label: string; url?: string; icon?: string; active?: boolean; }

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex text-sm text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        @for (item of items; track $index; let last = $last) {
          <li class="inline-flex items-center">
            @if (!$first) {
              <span class="mx-2 text-gray-400">
                <ng-container *ngIf="separator === 'slash'">/</ng-container>
                <ng-container *ngIf="separator === 'chevron'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </ng-container>
              </span>
            }
            <a [href]="item.url || '#'" 
               class="inline-flex items-center transition-colors"
               [ngClass]="item.active || last ? 'bg-brand-magenta text-white px-2 py-1 rounded-md' : 'hover:text-brand-magenta'">
              <span *ngIf="item.icon" class="mr-2" [innerHTML]="item.icon"></span>
              {{ item.label }}
            </a>
          </li>
        }
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: 'slash' | 'chevron' = 'slash';
}
