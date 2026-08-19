import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex" [ngClass]="position === 'right' ? 'justify-end' : 'justify-start'">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-900/50 transition-opacity" (click)="close.emit()"></div>
      
      <!-- Panel -->
      <div class="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-slide-in">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <ng-content select="[drawer-header]"></ng-content>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600 focus:outline-none">✕</button>
        </div>
        
        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <ng-content select="[drawer-content]"></ng-content>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-white">
          <ng-content select="[drawer-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  `]
})
export class DrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() position: 'left' | 'right' = 'right';
  @Output() close = new EventEmitter<void>();
}
