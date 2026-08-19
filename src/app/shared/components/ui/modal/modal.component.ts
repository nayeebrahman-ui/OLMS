import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" (click)="close.emit()"></div>
      
      <!-- Modal Panel -->
      <div class="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl flex flex-col animate-fade-in-up"
           [ngClass]="sizeClasses[size]">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <p *ngIf="description" class="text-sm text-gray-500 mt-1">{{ description }}</p>
          </div>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <!-- Body -->
        <div class="p-6 overflow-y-auto">
          <ng-content select="[modal-body]"></ng-content>
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 rounded-b-xl">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Title';
  @Input() description?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() close = new EventEmitter<void>();

  sizeClasses = {
    'sm': 'max-w-md',
    'md': 'max-w-2xl',
    'lg': 'max-w-4xl',
    'xl': 'max-w-6xl'
  };
}
