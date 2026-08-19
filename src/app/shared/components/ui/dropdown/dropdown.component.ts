import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <!-- Trigger -->
      <div (click)="toggleDropdown()" class="cursor-pointer">
        <ng-content select="[dropdown-trigger]"></ng-content>
      </div>

      <!-- Menu Popover -->
      <div *ngIf="isOpen" 
           class="absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
           [ngClass]="align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'">
        <div class="py-1">
          <ng-content select="[dropdown-menu]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent {
  @Input() align: 'left' | 'right' = 'left';
  isOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleDropdown() { this.isOpen = !this.isOpen; }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
