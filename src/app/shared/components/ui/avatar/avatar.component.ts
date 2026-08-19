import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block" [ngClass]="sizeClasses[size]">
      <img *ngIf="src; else placeholder" [src]="src" [alt]="initials"
           class="w-full h-full object-cover"
           [ngClass]="shape === 'circular' ? 'rounded-full' : 'rounded-md'" />
      
      <ng-template #placeholder>
        <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-medium"
             [ngClass]="shape === 'circular' ? 'rounded-full' : 'rounded-md'">
          {{ initials }}
        </div>
      </ng-template>

      <!-- Status Indicator -->
      <span *ngIf="status" 
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
            [ngClass]="statusMap[status]">
      </span>
    </div>
  `
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() initials: string = 'A';
  @Input() size: 'xs' | 'sm' | 'default' | 'lg' = 'default';
  @Input() shape: 'circular' | 'rounded' = 'circular';
  @Input() status?: 'online' | 'offline' | 'away' | 'dnd';

  sizeClasses = { 'xs': 'w-6 h-6 text-xs', 'sm': 'w-8 h-8 text-sm', 'default': 'w-10 h-10 text-base', 'lg': 'w-14 h-14 text-lg' };
  statusMap = { 'online': 'bg-green-500', 'offline': 'bg-gray-400', 'away': 'bg-yellow-400', 'dnd': 'bg-brand-red' };
}
